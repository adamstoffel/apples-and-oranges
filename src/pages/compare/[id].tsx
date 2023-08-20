import UndoIcon from '@mui/icons-material/Undo'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'

export default function Id() {
    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="stretch"
            spacing={1}
            width="100%"
        >
            <Typography level="h1" sx={{ flexGrow: 1 }}>
                Comparison
            </Typography>
            <Tooltip title="Start over with a new request">
                <Link href="/compare" passHref legacyBehavior>
                    <IconButton variant="soft" component="a">
                        <UndoIcon />
                    </IconButton>
                </Link>
            </Tooltip>
        </Stack>
    )
}
