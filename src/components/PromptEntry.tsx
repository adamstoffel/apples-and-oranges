import CompareRequest from '@/models/CompareRequest'
import Sheet from '@mui/joy/Sheet'
import Textarea from '@mui/joy/Textarea'
import Typography from '@mui/joy/Typography'

export default function PromptEntry({
    prompt,
    onChange = () => {},
}: Pick<CompareRequest, 'prompt'> & {
    onChange?: (newPrompt: typeof prompt) => void
}) {
    return (
        <>
            <Typography level="h3">Prompt</Typography>
            <Sheet variant="soft" sx={{ padding: 1 }}>
                <Textarea
                    minRows={2}
                    placeholder="What would you like to find out about?"
                    onChange={({ target }) => onChange(target.value)}
                />
            </Sheet>
        </>
    )
}
