const ERROR_IDENTIFIER = 'ERROR_RESPONSE' as const

export default interface ApiError {
    $type: typeof ERROR_IDENTIFIER
    message: string
}

export function createApiError(message: string): ApiError {
    return {
        $type: ERROR_IDENTIFIER,
        message,
    }
}

export function isApiError(input: any): input is ApiError {
    return (
        typeof input === 'object' &&
        input.$type === ERROR_IDENTIFIER &&
        typeof input.message === 'string'
    )
}
