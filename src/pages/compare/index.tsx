import ComparisonResponseDisplay from '@/components/ComparisonResponseDisplay'
import PromptEntry from '@/components/PromptEntry'
import TopicsEntry from '@/components/TopicEntry'
import CompareRequest from '@/models/CompareRequest'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function Index() {
    const [compareRequest, setCompareRequest] = useState<CompareRequest>({
        topics: [
            { id: uuid(), name: '', sources: [] },
            { id: uuid(), name: '', sources: [] },
        ],
        prompt: '',
    })

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
                <Tooltip title="Reset form">
                    <IconButton variant="soft">
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
            <ComparisonResponseDisplay />
        </Stack>
    )
}
