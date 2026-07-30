import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the counter with an initial value of 0', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Count is 0' })).toBeInTheDocument()
  })

  it('increments the counter when the button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const counterButton = screen.getByRole('button', { name: 'Count is 0' })
    await user.click(counterButton)
    await user.click(counterButton)

    expect(screen.getByRole('button', { name: 'Count is 2' })).toBeInTheDocument()
  })

  it('renders documentation and social sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Documentation', level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Connect with us', level: 2 })).toBeInTheDocument()
  })

  it('renders external navigation links', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /explore vite/i })).toHaveAttribute('href', 'https://vite.dev/')
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute('href', 'https://react.dev/')
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/vitejs/vite')
  })
})
