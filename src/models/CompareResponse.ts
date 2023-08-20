export default interface CompareResponse {
    responses: Array<{
        topicId: string
        responseNarrative: string
    }>
    comparisonNarrative: string
}
