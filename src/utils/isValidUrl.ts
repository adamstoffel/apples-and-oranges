export function isValidUrl(input: string) {
    try {
        const url = new URL(input)
        if (url.protocol === 'http:' || url.protocol === 'https:') {
            return true
        }
    } catch {
        // fall through
    }
    return false
}
