import PromptEntry from '@/components/PromptEntry'
import TopicsEntry from '@/components/TopicsEntry'
import CompareRequest from '@/models/CompareRequest'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import clone from 'clone'
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
    const [compareRequest, setCompareRequest] = useState<CompareRequest>(
        clone(emptyRequest)
    )

    function generateComparison() {
        // TODO
    }

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            divider={<Divider />}
        >
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
                        onClick={() => setCompareRequest(clone(emptyRequest))}
                    >
                        <DeleteSweepIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
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
                onClick={() => generateComparison()}
            >
                Generate comparison
            </Button>
        </Stack>
    )
}
