import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FilterButtonsGrid from '../components/FilterButtonsGrid'

describe('FilterButtonsGrid', () => {
  const mockResetFilter = jest.fn()

  beforeEach(() => {
    render(<FilterButtonsGrid resetFilter={mockResetFilter} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders reset and search buttons correctly', () => {
    expect(screen.getByText('Reset Filter')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  test('calls resetFilter on reset button click', () => {
    const resetButton = screen.getByText('Reset Filter')
    fireEvent.click(resetButton)
    expect(mockResetFilter).toHaveBeenCalled()
  })

  test('renders search button with correct class', () => {
    const searchButton = screen.getByText('Search')
    expect(searchButton).toHaveClass('w-[168px] btn')
  })
})
