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
                                level="title-sm"
                                textTransform="uppercase"
                            >
                                {response.topicName}
                            </Typography>
                            <Typography level="body-md">
                                {response.narrative}
                            </Typography>
                        </Sheet>
                    </Grid>
                ))}
            </Grid>
            <Sheet variant="soft" sx={{ padding: 1, mt: 1 }}>
                <Typography level="title-sm" textTransform="uppercase">
                    How these topics compare&hellip;
                </Typography>
                <Typography level="body-md">
                    {result.comparisonNarrative}
                </Typography>
            </Sheet>
        </Box>
    )
}
