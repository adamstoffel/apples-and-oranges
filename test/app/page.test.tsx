import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
    it('should render a getting started block', () => {
        render(<Home />)
        const p = screen.getByTestId('getting-started-text')
        expect(p).toHaveTextContent(/^Get started/)
    })
})
