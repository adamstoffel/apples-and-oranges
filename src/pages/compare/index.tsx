import PromptEntry from '@/components/PromptEntry'
import TopicsEntry from '@/components/TopicsEntry'
import { isApiError } from '@/models/ApiError'
import CompareRequest from '@/models/CompareRequest'
import CompareRequestResponse from '@/models/CompareRequestResponse'
import SmartToyIcon from '@mui/icons-material/CompareArrows'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import HomeIcon from '@mui/icons-material/Home'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import clone from 'clone'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

const emptyRequest: CompareRequest = {
    topics: [
        { id: uuid(), name: '', sources: [] },
        { id: uuid(), name: '', sources: [] },
    ],
    prompt: '',
}

const sampleRequest: CompareRequest = {
    topics: [
        {
            id: uuid(),
            name: 'Apples',
            sources: [
                'https://en.m.wikipedia.org/wiki/Apple',
                'https://www.britannica.com/plant/apple-fruit-and-tree',
            ],
        },
        {
            id: uuid(),
            name: 'Oranges',
            sources: ['https://en.m.wikipedia.org/wiki/Orange_(fruit)'],
        },
    ],
    prompt: 'What does this fruit taste like?',
}

export default function Index({}) {
    const router = useRouter()
    const useSample = router.query['sample'] !== undefined

    const [compareRequest, setCompareRequest] = useState(
        clone(useSample ? sampleRequest : emptyRequest)
    )
    const [awaitingGeneration, setAwaitingGeneration] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function generateComparison() {
        setAwaitingGeneration(true)
        const response = await fetch('/api/compare', {
            method: 'POST',
            body: JSON.stringify(compareRequest),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        if (!response.ok) {
            let message = 'An unknown error occurred.'
            try {
                const data = await response.json()
                if (isApiError(data)) {
                    message = data.message
                }
            } catch {
                // ignore
            }
            setErrorMessage(message)
            setAwaitingGeneration(false)
        } else {
            const data: CompareRequestResponse = await response.json()
            router.push(`/compare/${data.resultId}`)
        }
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                generateComparison()
            }}
        >
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
                            Create a comparison
                        </Typography>
                        <Tooltip title="Go back to the homepage">
                            <Link href="/" passHref legacyBehavior>
                                <IconButton variant="soft" component="a">
                                    <HomeIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Clear data and start over">
                            <IconButton
                                data-testid="compare-reset-button"
                                variant="soft"
                                onClick={() =>
                                    setCompareRequest(clone(emptyRequest))
                                }
                            >
                                <DeleteSweepIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Fill with sample data">
                            <IconButton
                                data-testid="compare-sample-button"
                                variant="soft"
                                onClick={() =>
                                    setCompareRequest(clone(sampleRequest))
                                }
                            >
                                <LightbulbIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    {typeof errorMessage === 'string' && (
                        <Typography
                            color="danger"
                            level="body-md"
                            variant="soft"
                            sx={{ whiteSpace: 'pre-line', mt: 1 }}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
                <TopicsEntry
                    topics={compareRequest.topics}
                    onChange={(topics) =>
                        setCompareRequest({ ...compareRequest, topics })
                    }
                />
                <PromptEntry
                    prompt={compareRequest.prompt}
                    onChange={(prompt) =>
                        setCompareRequest({ ...compareRequest, prompt })
                    }
                />
                <Button
                    size="lg"
                    sx={{ alignSelf: 'center' }}
                    type="submit"
                    loading={awaitingGeneration}
                    loadingPosition="start"
                    startDecorator={<SmartToyIcon />}
                >
                    {awaitingGeneration
                        ? 'Working on it...'
                        : 'Generate comparison'}
                </Button>
            </Stack>
        </form>
    )
}
