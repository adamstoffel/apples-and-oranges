export default interface CompareRequest {
    topics: [CompareRequestTopic, CompareRequestTopic]
    prompt: string
}

interface CompareRequestTopic {
    id: string
    name: string
    sources: string[]
}
