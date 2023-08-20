import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/ScopedCssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Apples and Oranges</title>
            </Head>
            <CssVarsProvider>
                <CssBaseline />
                <Box maxWidth="1000px" marginX="auto" marginY={4}>
                    <Component {...pageProps} />{' '}
                </Box>
            </CssVarsProvider>
        </>
    )
}
