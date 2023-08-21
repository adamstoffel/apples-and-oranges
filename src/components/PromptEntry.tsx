import CompareRequest from '@/models/CompareRequest'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Textarea from '@mui/joy/Textarea'
import Typography from '@mui/joy/Typography'

export default function PromptEntry({
    prompt,
    readonly,
    onChange = () => {},
}: Pick<CompareRequest, 'prompt'> & {
    readonly?: boolean
    onChange?: (newPrompt: typeof prompt) => void
}) {
    return (
        <Box>
            <Typography level="h3">Prompt</Typography>
            <Sheet variant="soft" sx={{ padding: 1 }}>
                {readonly ? (
                    <Typography data-testid="prompt-display" level="body-md">
                        {prompt}
                    </Typography>
                ) : (
                    <Textarea
                        data-testid="prompt-input"
                        minRows={2}
                        placeholder="What would you like to find out about?"
                        value={prompt}
                        onChange={({ target }) => onChange(target.value)}
                    />
                )}
            </Sheet>
        </Box>
    )
}
