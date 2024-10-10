import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductsWithCategorisFilter from '../components/ProductsWithCategorisFilter'
import CategoriesFilter from '../components/CategoriesFilter'
import ProductCardList from '../components/ProductCardList'

// Mock the child components
jest.mock('../components/CategoriesFilter', () => jest.fn(() => <div>CategoriesFilter</div>))
jest.mock('../components/ProductCardList', () => jest.fn(() => <div>ProductCardList</div>))

describe('ProductsWithCategorisFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = () => {
    return render(<ProductsWithCategorisFilter />)
  }

  test('renders correctly', () => {
    renderComponent()
    expect(screen.getByText('CategoriesFilter')).toBeInTheDocument()
    expect(screen.getByText('ProductCardList')).toBeInTheDocument()
  })

  test('renders CategoriesFilter with correct props', () => {
    renderComponent()
    expect(CategoriesFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        categories: [],
        setCategories: expect.any(Function),
        selectedCategoryId: 0,
        setSelectedCategoryId: expect.any(Function),
        scrollUp: expect.any(Function),
      }),
      {},
    )
  })

  test('renders ProductCardList with correct props', () => {
    renderComponent()
    expect(ProductCardList).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId: 0,
        setSelectedCategoryId: expect.any(Function),
        shouldScrollUp: false,
        stopScrollUp: expect.any(Function),
      }),
      {},
    )
  })
})
