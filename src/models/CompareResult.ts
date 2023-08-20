export default interface CompareResult {
    responses: Array<{
        topicId: string
        topicName: string
        narrative: string
    }>
    comparisonNarrative: string
}
