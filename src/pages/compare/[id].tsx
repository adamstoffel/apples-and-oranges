import PromptEntry from '@/components/PromptEntry'
import ResultDisplay from '@/components/ResultDisplay'
import TopicsEntry from '@/components/TopicsEntry'
import CompareRequest from '@/models/CompareRequest'
import CompareResult from '@/models/CompareResult'
import StorageService from '@/utils/StorageService'
import CheckIcon from '@mui/icons-material/Check'
import HomeIcon from '@mui/icons-material/Home'
import ReplayIcon from '@mui/icons-material/Replay'
import ShareIcon from '@mui/icons-material/Share'
import Box from '@mui/joy/Box'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useState } from 'react'

export default function Id({
    compareRequest,
    compareResult,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [showCopyLinkSuccess, setShowCopyLinkSuccess] = useState(false)
    function copyLink() {
        navigator.clipboard.writeText(window.location.href)
        setShowCopyLinkSuccess(true)
        setTimeout(() => setShowCopyLinkSuccess(false), 3000)
    }

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            divider={<Divider />}
        >
            <Box>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="stretch"
                    spacing={1}
                    width="100%"
                >
                    <Typography level="h1" sx={{ flexGrow: 1 }}>
                        Comparison
                    </Typography>
                    <Link href="/" passHref legacyBehavior>
                        <Tooltip title="Go back to the homepage">
                            <IconButton variant="soft" component="a">
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link href="/compare" passHref legacyBehavior>
                        <Tooltip title="Start over with a new request">
                            <IconButton variant="soft" component="a">
                                <ReplayIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Press here to copy a permalink to this comparison">
                        <IconButton
                            variant="soft"
                            color={showCopyLinkSuccess ? 'success' : undefined}
                            onClick={() => copyLink()}
                        >
                            {showCopyLinkSuccess ? (
                                <CheckIcon />
                            ) : (
                                <ShareIcon />
                            )}
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Typography level="title-lg" sx={{ flexGrow: 1 }}>
                    {compareRequest.topics[0].name} vs.
                    {compareRequest.topics[1].name}
                </Typography>
            </Box>
            <TopicsEntry topics={compareRequest.topics} readonly />
            <PromptEntry prompt={compareRequest.prompt} readonly />
            <ResultDisplay result={compareResult} />
        </Stack>
    )
}

export const getServerSideProps: GetServerSideProps<{
    compareRequest: CompareRequest
    compareResult: CompareResult
}> = async ({ params }) => {
    if (typeof params?.id !== 'string') {
        throw new Error('Unexpected empty "id" parameter')
    }

    const storageService = new StorageService()
    const comparison = await storageService.fetchComparison(params?.id)

    if (!comparison) {
        return { notFound: true }
    }

    return {
        props: {
            compareRequest: comparison.request,
            compareResult: comparison.result,
        },
    }
}
