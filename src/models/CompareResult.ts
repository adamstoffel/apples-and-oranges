export default interface CompareResult {
    responses: Array<{
        topicId: string
        responseNarrative: string
    }>
    comparisonNarrative: string
}
