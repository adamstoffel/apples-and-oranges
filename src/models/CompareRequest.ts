import { isValidUrl } from '@/utils/isValidUrl'

export default interface CompareRequest {
    topics: [CompareRequestTopic, CompareRequestTopic]
    prompt: string
}

interface CompareRequestTopic {
    id: string
    name: string
    sources: string[]
}

export function isCompareRequest(input: any): input is CompareRequest {
    return (
        typeof input === 'object' &&
        Array.isArray(input.topics) &&
        input.topics.map(isCompareRequestTopic) &&
        typeof input.prompt === 'string'
    )
}

function isCompareRequestTopic(input: any): input is CompareRequestTopic {
    return (
        typeof input === 'object' &&
        typeof input.id === 'string' &&
        typeof input.name === 'string' &&
        Array.isArray(input.sources) &&
        input.sources.map((s: any) => typeof s === 'string')
    )
}

export function validateCompareRequest(data: CompareRequest) {
    const errors: string[] = []

    if (data.topics.some((t) => t.name === '')) {
        errors.push('All topics must have a name.')
    }

    if (data.topics.some((t) => t.sources.length < 1)) {
        errors.push('All topics must have at least one source.')
    }

    if (data.topics.some((t) => t.sources.some((s) => !isValidUrl(s)))) {
        errors.push('All topic sources must be valid URLs.')
    }

    if (data.prompt === '') {
        errors.push('A prompt must be provided.')
    }

    return { errors }
}
