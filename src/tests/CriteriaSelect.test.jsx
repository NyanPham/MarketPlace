import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CriteriaSelect from '../components/CriteriaSelect'

describe('CriteriaSelect', () => {
  const mockOptions = [
    { name: 'Option 1', value: '1', isDefault: false },
    { name: 'Option 2', value: '2', isDefault: false },
  ]

  const mockSetSelectedValue = jest.fn()

  beforeEach(() => {
    render(<CriteriaSelect title="Test Title" options={mockOptions} selectedValue="1" setSelectedValue={mockSetSelectedValue} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders options correctly', () => {
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument()
    })
  })

  test('calls setSelectedValue on option select', () => {
    const selectElement = screen.getByRole('combobox')
    fireEvent.change(selectElement, { target: { value: '2' } })
    expect(mockSetSelectedValue).toHaveBeenCalledWith('2')
  })
})
