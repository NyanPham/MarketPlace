import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoriesFilter from '../components/CategoriesFilter'
import * as api from '../api/categories'

jest.mock('../api/categories')

describe('CategoriesFilter', () => {
  const mockCategories = [
    { title: 'All', id: 0, slug: 'all', description: '' },
    { title: 'Category 1', id: 1, slug: 'category-1', description: 'Description 1' },
    { title: 'Category 2', id: 2, slug: 'category-2', description: 'Description 2' },
  ]

  const mockSetCategories = jest.fn()
  const mockSetSelectedCategoryId = jest.fn()
  const mockScrollUp = jest.fn()

  beforeEach(() => {
    jest.spyOn(api, 'fetchCategories').mockResolvedValue(mockCategories.slice(1))
    render(
      <CategoriesFilter
        categories={mockCategories}
        setCategories={mockSetCategories}
        selectedCategoryId={0}
        setSelectedCategoryId={mockSetSelectedCategoryId}
        scrollUp={mockScrollUp}
      />,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders categories correctly', () => {
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.title)).toBeInTheDocument()
    })
  })

  test('calls setSelectedCategoryId on category click', () => {
    const categoryButton = screen.getByText('Category 1')
    fireEvent.click(categoryButton)
    expect(mockSetSelectedCategoryId).toHaveBeenCalledWith(1)
  })

  test('calls scrollUp on scroll up button click', () => {
    const scrollUpButton = screen.getByTitle('Scroll up')
    fireEvent.click(scrollUpButton)
    expect(mockScrollUp).toHaveBeenCalled()
  })
})
