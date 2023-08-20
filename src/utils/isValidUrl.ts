export function isValidUrl(input: string) {
    try {
        const url = new URL(input)
        console.log(url.protocol)
        if (url.protocol === 'http:' || url.protocol === 'https:') {
            return true
        }
    } catch {
        // fall through
    }
    return false
}
