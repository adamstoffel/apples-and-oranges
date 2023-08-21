import CompareResult from '@/models/CompareResult'
import Box from '@mui/joy/Box'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'

export default function ResultDisplay({ result }: { result: CompareResult }) {
    return (
        <Box>
            <Typography level="h3">Language Model Result</Typography>
            <Grid container spacing={1}>
                {result.responses.map((response) => (
                    <Grid key={response.topicId} sm={6} xs={12}>
                        <Sheet variant="soft" sx={{ padding: 1 }}>
                            <Typography
                                data-testid={`result-title-${response.topicId}`}
                                level="title-sm"
                                textTransform="uppercase"
                                sx={{ mb: 1 }}
                            >
                                {response.topicName}
                            </Typography>
                            <Typography
                                data-testid={`result-narrative-${response.topicId}`}
                                level="body-md"
                                sx={{ whiteSpace: 'pre-line', mt: 1 }}
                            >
                                {response.narrative}
                            </Typography>
                        </Sheet>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
