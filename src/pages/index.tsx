import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
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
        </Stack>
    )
}
