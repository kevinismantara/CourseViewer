import React from 'react'
import { render, screen } from '@testing-library/react'
import { CourseTreeViewer, type CourseItem } from '../CourseTreeViewer'

describe('CourseTreeViewer (component)', () => {
  it('renders a tree with correct structure and hyphens', () => {
    const data: CourseItem[] = [
      { id: 1, name: 'Math10', parent_id: 0 },
      { id: 2, name: 'PreCalculus11', parent_id: 1 },
      { id: 3, name: 'Statistics11', parent_id: 1 },
      { id: 4, name: 'Statistics12', parent_id: 3 },
      { id: 5, name: 'Science10', parent_id: 0 },
      { id: 6, name: 'Physics11', parent_id: 5 },
    ]

    render(<CourseTreeViewer data={data} />)

    const mathParent = screen.getByText('Math10')
    const scienceParent = screen.getByText('Science10')
    expect(mathParent).toBeInTheDocument()
    expect(scienceParent).toBeInTheDocument()
    expect(mathParent.parentElement as HTMLElement)
    expect(scienceParent.parentElement as HTMLElement)

    const preCalcChild = screen.getByText('- PreCalculus11')
    const statisticsChild = screen.getByText('- Statistics11')
    const physicsChild = screen.getByText('- Physics11')
    expect(preCalcChild.parentElement as HTMLElement)
    expect(statisticsChild.parentElement as HTMLElement)
    expect(physicsChild.parentElement as HTMLElement)

    const statisticsGrandChild = screen.getByText('- - Statistics12')
    expect(statisticsGrandChild.parentElement as HTMLElement)
  })

  it('renders message when there is no data returned', () => {
    const emptyData: CourseItem[] = []
    render(<CourseTreeViewer data={emptyData} />)
    expect(screen.getByText(/No courses found/i)).toBeInTheDocument()
  })

  it('renders error message when data is not renderable (no parent_id = 0)', () => {
    const invalid: CourseItem[] = [
      { id: 10, name: 'Pre Calculus 10', parent_id: 99 },
    ]
    render(<CourseTreeViewer data={invalid} />)
    expect(screen.getByText(/there is an issue with the data/i)).toBeInTheDocument()
  })

  it('renders error message when a node references a missing parent', () => {
    const invalid: CourseItem[] = [
      { id: 1, name: 'Pre Calculus 10', parent_id: 0 },
      { id: 2, name: 'Science 10', parent_id: 999 },
    ]
    render(<CourseTreeViewer data={invalid} />)
    expect(screen.getByText(/there is an issue with the data/i)).toBeInTheDocument()
  })
})