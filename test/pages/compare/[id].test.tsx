import CompareRequest from '@/models/CompareRequest'
import CompareResult from '@/models/CompareResult'
import Id from '@/pages/compare/[id]'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import '../../../src/utils/StorageService'
jest.mock('../../../src/utils/StorageService', () => {
    return function () {}
})

describe('compare/[id]', () => {
    const topicNameDisplays = () => screen.getAllByTestId('topic-name-display')
    const topicSourcesDisplays = () =>
        screen.getAllByTestId('topic-sources-display')
    const promptDisplay = () => screen.getByTestId('prompt-display')

    beforeEach(() => {
        const compareRequest = {
            topics: [
                {
                    id: '1',
                    name: 'Topic 1',
                    sources: ['http://source1', 'http://source2'],
                },
                {
                    id: '2',
                    name: 'Topic 2',
                    sources: ['http://source3', 'http://source4'],
                },
            ],
            prompt: 'Prompt?',
        } satisfies CompareRequest

        const compareResult = {
            responses: [
                {
                    topicId: '1',
                    topicName: 'Topic 1',
                    narrative: 'Response narrative 1',
                },
                {
                    topicId: '2',
                    topicName: 'Topic 2',
                    narrative: 'Response narrative 2',
                },
            ],
        } satisfies CompareResult
        render(
            <Id compareRequest={compareRequest} compareResult={compareResult} />
        )
    })

    it('should render a complete comparison display', () => {
        expect(topicNameDisplays()).toHaveLength(2)
        expect(topicNameDisplays().map((d) => d.textContent)).toEqual([
            'Topic 1',
            'Topic 2',
        ])

        expect(topicSourcesDisplays()).toHaveLength(2)
        expect(topicSourcesDisplays().map((d) => d.textContent)).toEqual([
            'http://source1http://source2',
            'http://source3http://source4',
        ])

        expect(promptDisplay().textContent).toBe('Prompt?')

        expect(screen.getByTestId('result-title-1').textContent).toBe('Topic 1')
        expect(screen.getByTestId('result-title-2').textContent).toBe('Topic 2')

        expect(screen.getByTestId('result-narrative-1').textContent).toBe(
            'Response narrative 1'
        )
        expect(screen.getByTestId('result-narrative-2').textContent).toBe(
            'Response narrative 2'
        )
    })
})
