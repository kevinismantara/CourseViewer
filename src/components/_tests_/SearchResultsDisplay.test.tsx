import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SearchResultsDisplay }  from '../../components/CourseViewer'

describe('SearchResultsDisplay', () => {
  it('shows "No data to display" when hasSearched is true and no data', () => {
    render(
      <SearchResultsDisplay
        data={undefined}
        error={null}
        isLoading={false}
        hasSearched={true}
      />
    )
    expect(screen.getByText(/no data to display/i)).toBeInTheDocument()
  })

  it('shows spinner while loading', () => {
    render(
      <SearchResultsDisplay
        data={undefined}
        error={null}
        isLoading={true}
        hasSearched={true}
      />
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows error when present', () => {
    const err = new Error('boom')
    render(
      <SearchResultsDisplay
        data={undefined}
        error={err}
        isLoading={false}
        hasSearched={true}
      />
    )
    expect(screen.getByText(/boom/i)).toBeInTheDocument()
  })
})