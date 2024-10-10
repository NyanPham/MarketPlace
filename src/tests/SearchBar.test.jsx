import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  const mockSetSearchValue = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (searchValue = '') => {
    return render(<SearchBar searchValue={searchValue} setSearchValue={mockSetSearchValue} />)
  }

  test('renders correctly', () => {
    renderComponent()
    expect(screen.getByPlaceholderText('Quick Search')).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  test('displays the correct input value', () => {
    const searchValue = 'test'
    renderComponent(searchValue)
    expect(screen.getByDisplayValue(searchValue)).toBeInTheDocument()
  })

  test('calls setSearchValue with the correct value when input changes', () => {
    renderComponent()
    const inputElement = screen.getByRole('searchbox')
    fireEvent.change(inputElement, { target: { value: 'new value' } })
    expect(mockSetSearchValue).toHaveBeenCalledWith('new value')
  })
})
