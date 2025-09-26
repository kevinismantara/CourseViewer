import React from 'react'
import userEvent from '@testing-library/user-event'
import { CourseSearchForm } from '../CourseViewer'
import { render, screen } from '@testing-library/react'

describe('CourseSearchForm', () => {
  it('shows validation alert when submitting empty input', async () => {
    const user = userEvent.setup()
    const onSubmitSearch = jest.fn()

    render(<CourseSearchForm onSubmitSearch={onSubmitSearch} isLoading={false} />)

    const button = screen.getByRole('button', { name: /search/i })
    await user.click(button)

    expect(screen.getByText(/please enter a value/i)).toBeInTheDocument()
    expect(onSubmitSearch).not.toHaveBeenCalled()
  })

  it('calls onSubmitSearch and hides alert when input provided', async () => {
    const user = userEvent.setup()
    const onSubmitSearch = jest.fn()

    render(<CourseSearchForm onSubmitSearch={onSubmitSearch} isLoading={false} />)

    await user.type(screen.getByPlaceholderText(/course/i), 'math')
    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(onSubmitSearch).toHaveBeenCalledWith('math')
    expect(screen.queryByText(/please enter a value/i)).not.toBeInTheDocument()
  })

  it('renders spinner when loading', () => {
    const onSubmitSearch = jest.fn()
    render(<CourseSearchForm onSubmitSearch={onSubmitSearch} isLoading={true} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})