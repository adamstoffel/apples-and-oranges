import Index from '@/pages/compare/index'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        query: {},
    })),
}))

describe('compare/index', () => {
    let user: ReturnType<(typeof userEvent)['setup']>
    const topicNameInputs = () => screen.getAllByTestId('topic-name-input')
    const topicSourcesInputs = () =>
        screen.getAllByTestId('topic-sources-input')
    const promptInput = () => screen.getByTestId('prompt-input')
    const resetButton = () => screen.getByTestId('compare-reset-button')
    const sampleButton = () => screen.getByTestId('compare-sample-button')

    beforeEach(() => {
        user = userEvent.setup()
        render(<Index />)
    })

    it('should render an empty topic input form with 2 topics', () => {
        expect(topicNameInputs()).toHaveLength(2)
        for (const input of topicNameInputs()) {
            const htmlInput = input.querySelector('input')
            expect(htmlInput).not.toBeNull()
            expect(htmlInput).toHaveValue('')
        }

        expect(topicSourcesInputs()).toHaveLength(2)
        for (const input of topicSourcesInputs()) {
            const htmlInput = input.querySelector('input')
            expect(htmlInput).not.toBeNull()
            expect(htmlInput).toHaveValue('')
        }

        expect(promptInput()).toBeDefined()
        const promptHtmlInput = promptInput().querySelector('textarea')
        expect(promptHtmlInput).not.toBeNull()
        expect(promptHtmlInput).toHaveValue('')
    })

    it('should reset the form when the reset button is pressed', async () => {
        for (const input of topicNameInputs()) {
            const htmlInput = input.querySelector('input')
            await user.click(htmlInput!)
            await user.type(htmlInput!, 'Test Topic{Tab}')
            expect(htmlInput).toHaveValue('Test Topic')
        }

        for (const input of topicSourcesInputs()) {
            const htmlInput = input.querySelector('input')
            await user.click(htmlInput!)
            await user.keyboard(
                'http://TestSource-1{Enter}http://TestSource-2{Enter}'
            )
            expect(input.textContent).toBe(
                'http://TestSource-1http://TestSource-2'
            )
        }

        const promptHtmlInput = promptInput().querySelector('textarea')
        await user.click(promptHtmlInput!)
        await user.type(promptHtmlInput!, 'Test Prompt{Tab}')
        expect(promptHtmlInput).toHaveValue('Test Prompt')

        await user.click(resetButton())

        for (const input of topicNameInputs()) {
            const htmlInput = input.querySelector('input')
            expect(htmlInput).toHaveValue('')
        }

        for (const input of topicSourcesInputs()) {
            expect(input.textContent).toBe('')
        }

        expect(promptHtmlInput).toHaveValue('')
    })

    it('should populate the form when the sample data button is pressed', async () => {
        await user.click(sampleButton())

        for (const input of topicNameInputs()) {
            const htmlInput = input.querySelector('input')
            expect(htmlInput).not.toHaveValue('')
        }

        for (const input of topicSourcesInputs()) {
            expect(input.textContent).not.toBe('')
        }

        const promptHtmlInput = promptInput().querySelector('textarea')
        expect(promptHtmlInput).not.toHaveValue('')
    })
})
