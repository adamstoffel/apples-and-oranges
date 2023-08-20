import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'

export default function Index() {
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
                provide a questions or prompt for the model, and it will respond
                for each topic. You will provide the source material(s) for each
                topic, which the model will use to produce a response.
            </Typography>
            <Link href="/compare" passHref legacyBehavior>
                <Button component="a" size="lg" sx={{ alignSelf: 'center' }}>
                    Create a comparison
                </Button>
            </Link>
        </Stack>
    )
}
