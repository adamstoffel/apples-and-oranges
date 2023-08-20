import PromptEntry from '@/components/PromptEntry'
import TopicsEntry from '@/components/TopicsEntry'
import { isApiError } from '@/models/ApiError'
import CompareRequest from '@/models/CompareRequest'
import CompareRequestResponse from '@/models/CompareRequestResponse'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import clone from 'clone'
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

export default function Index() {
    const router = useRouter()

    const [compareRequest, setCompareRequest] = useState<CompareRequest>(
        clone(emptyRequest)
    )

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function generateComparison() {
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
                <Button size="lg" sx={{ alignSelf: 'center' }} type="submit">
                    Generate comparison
                </Button>
            </Stack>
        </form>
    )
}
