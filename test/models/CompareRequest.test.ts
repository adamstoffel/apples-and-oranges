import CompareRequest, { validateCompareRequest } from '@/models/CompareRequest'

describe('validateCompareRequest', () => {
    it('should have no errors for valid request', () => {
        const request = {
            topics: [
                { id: '1', name: 'name', sources: ['http://source'] },
                { id: '2', name: 'name', sources: ['http://source'] },
            ],
            prompt: 'prompt',
        } satisfies CompareRequest
        const { errors } = validateCompareRequest(request)
        expect(errors).toHaveLength(0)
    })

    it('should have single error when one topic name is empty', () => {
        const request = {
            topics: [
                { id: '1', name: '', sources: ['http://source'] },
                { id: '2', name: 'name', sources: ['http://source'] },
            ],
            prompt: 'prompt',
        } satisfies CompareRequest
        const { errors } = validateCompareRequest(request)
        expect(errors).toHaveLength(1)
    })

    it('should have single error when both topic names are empty', () => {
        const request = {
            topics: [
                { id: '1', name: '', sources: ['http://source'] },
                { id: '2', name: 'name', sources: ['http://source'] },
            ],
            prompt: 'prompt',
        } satisfies CompareRequest
        const { errors } = validateCompareRequest(request)
        expect(errors).toHaveLength(1)
    })

    it('should have single error when source list is empty', () => {
        const request = {
            topics: [
                { id: '1', name: 'name', sources: [] },
                { id: '2', name: 'name', sources: ['http://source'] },
            ],
            prompt: 'prompt',
        } satisfies CompareRequest
        const { errors } = validateCompareRequest(request)
        expect(errors).toHaveLength(1)
    })

    it('should have single error when source item is invalid', () => {
        const request = {
            topics: [
                { id: '1', name: 'name', sources: ['not a valid url'] },
                { id: '2', name: 'name', sources: ['http://source'] },
            ],
            prompt: 'prompt',
        } satisfies CompareRequest
        const { errors } = validateCompareRequest(request)
        expect(errors).toHaveLength(1)
    })

    it('should have single error when prompt is empty', () => {
        const request = {
            topics: [
                { id: '1', name: 'name', sources: ['http://source'] },
                { id: '2', name: 'name', sources: ['http://source'] },
            ],
            prompt: '',
        } satisfies CompareRequest
        const { errors } = validateCompareRequest(request)
        expect(errors).toHaveLength(1)
    })

    it('should have three errors when three items are missing', () => {
        const request = {
            topics: [
                { id: '1', name: '', sources: [''] },
                { id: '2', name: 'name', sources: ['http://source'] },
            ],
            prompt: '',
        } satisfies CompareRequest
        const { errors } = validateCompareRequest(request)
        expect(errors).toHaveLength(3)
    })
})
