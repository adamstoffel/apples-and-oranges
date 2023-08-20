import Index from '@/pages/compare/index'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('compare/index', () => {
    let user: ReturnType<(typeof userEvent)['setup']>
    let topicNameInputs: HTMLElement[]
    let topicSourcesInputs: HTMLElement[]
    let resetButton: HTMLElement

    beforeEach(() => {
        user = userEvent.setup()
        render(<Index />)
        topicNameInputs = screen.getAllByTestId('topic-name-input')
        topicSourcesInputs = screen.getAllByTestId('topic-sources-input')
        resetButton = screen.getByTestId('compare-reset-button')
    })

    it('should render an empty topic input form with 2 topics', () => {
        expect(topicNameInputs).toHaveLength(2)
        for (const input of topicNameInputs) {
            const htmlInput = input.querySelector('input')
            expect(htmlInput).not.toBeNull()
            expect(htmlInput).toHaveValue('')
        }

        expect(topicSourcesInputs).toHaveLength(2)
        for (const input of topicSourcesInputs) {
            const htmlInput = input.querySelector('input')
            expect(htmlInput).not.toBeNull()
            expect(htmlInput).toHaveValue('')
        }
    })

    it('should reset the form when the reset button is pressed', async () => {
        for (const input of topicNameInputs) {
            const htmlInput = input.querySelector('input')
            await user.click(htmlInput!)
            await user.type(htmlInput!, 'Test Topic{Tab}')
            expect(htmlInput).toHaveValue('Test Topic')
        }

        for (const input of topicSourcesInputs) {
            const htmlInput = input.querySelector('input')
            await user.click(htmlInput!)
            await user.keyboard(
                'http://TestSource-1{Enter}http://TestSource-2{Enter}'
            )
            expect(input.textContent).toBe(
                'http://TestSource-1http://TestSource-2'
            )
        }

        await user.click(resetButton)

        for (const input of topicNameInputs) {
            const htmlInput = input.querySelector('input')
            expect(htmlInput).toHaveValue('')
        }

        for (const input of topicSourcesInputs) {
            expect(input.textContent).toBe('')
        }
    })
})
