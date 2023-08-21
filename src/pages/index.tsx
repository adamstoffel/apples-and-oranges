import CompareRequest from '@/models/CompareRequest'
import StorageService from '@/utils/StorageService'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import Grid from '@mui/joy/Grid'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export default function Index({
    recentComparisons,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
        >
            <Typography level="h1">Apples and Oranges</Typography>
            <Typography level="body-lg">
                This project can help you compare two topics to each other using
                the GPT-3.5 language learning model. You&apos;ll be able to
                provide a question or prompt for the model, and it will respond
                for each topic. You will provide the source material(s) for each
                topic, which the model will use to produce a response.
            </Typography>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Link href="/compare" passHref legacyBehavior>
                    <Button
                        component="a"
                        size="lg"
                        startDecorator={<CompareArrowsIcon />}
                    >
                        Create a comparison
                    </Button>
                </Link>
                <Link href="/compare?sample" passHref legacyBehavior>
                    <Button
                        component="a"
                        size="lg"
                        color="neutral"
                        variant="soft"
                        startDecorator={<LightbulbIcon />}
                    >
                        Start with a sample
                    </Button>
                </Link>
            </Stack>
            {recentComparisons.length > 0 && (
                <Box>
                    <Typography level="h4" sx={{ my: 2 }}>
                        Here&apos;s what other people are comparing&hellip;
                    </Typography>
                    <Grid container spacing={2} alignItems="stretch">
                        {recentComparisons.map(({ id, request }) => (
                            <Grid key={id} sm={4} xs={12}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        boxSizing: 'border-box',
                                        height: '100%',
                                    }}
                                >
                                    <CardOverflow
                                        variant="solid"
                                        color="primary"
                                        sx={{ px: 2, py: 1 }}
                                    >
                                        <Typography
                                            level="title-lg"
                                            fontWeight="xl"
                                            textColor="primary.solidColor"
                                        >
                                            {request.topics[0].name}
                                            <Typography
                                                fontSize="sm"
                                                textColor="primary.200"
                                            >
                                                {' '}
                                                vs.{' '}
                                            </Typography>
                                            {request.topics[1].name}
                                        </Typography>
                                    </CardOverflow>
                                    <CardContent sx={{ maxWidth: '40ch' }}>
                                        {request.prompt}
                                    </CardContent>
                                    <CardActions
                                        orientation="vertical"
                                        buttonFlex={1}
                                        sx={{
                                            '--Button-radius': '40px',
                                            width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                                        }}
                                    >
                                        <Link
                                            href={`/compare/${id}`}
                                            passHref
                                            legacyBehavior
                                        >
                                            <Button
                                                component="a"
                                                color="primary"
                                                variant="soft"
                                                sx={{ py: '.15em' }}
                                            >
                                                See the result
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Stack>
    )
}

export const getServerSideProps: GetServerSideProps<{
    recentComparisons: Array<{
        id: string
        request: CompareRequest
    }>
}> = async ({ params }) => {
    const storageService = new StorageService()
    const recentComparisons = await storageService.fetchRecentComparisons(3)

    return {
        props: { recentComparisons },
    }
}
