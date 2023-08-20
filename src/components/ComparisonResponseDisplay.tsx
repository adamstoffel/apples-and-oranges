import CompareResponse from '@/models/CompareResult'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'

export default function ComparisonResponseDisplay(response: CompareResponse) {
    return (
        <>
            <Typography level="h3">Comparison</Typography>
            <Grid container spacing={1}>
                {response.responses.map(({}, index) => (
                    <Grid key={index} sm={6}>
                        <Sheet variant="soft" sx={{ padding: 1 }}></Sheet>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
