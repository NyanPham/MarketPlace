import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ProductCardList from '../components/ProductCardList'
import { fetchProducts } from '../api/products'
import { toggleSearchTrigger } from '../store/slices/filterFormSlice'

jest.mock('../api/products')
jest.mock('../store/slices/filterFormSlice', () => ({
  toggleSearchTrigger: jest.fn(),
}))

const mockStore = configureStore([thunk])

const initialState = {
  filter: {
    minPrice: 0,
    maxPrice: 100,
    searchValue: '',
    selectedTier: '',
    selectedTheme: '',
    sortedTime: 'ascending',
    sortedPrice: 'ascending',
    searchTrigger: false,
  },
}

const mockProducts = [
  {
    id: '1',
    title: 'Product 1',
    imageUrl: 'image-url-1',
    price: 10,
    categoryIds: [1],
  },
  {
    id: '2',
    title: 'Product 2',
    imageUrl: 'image-url-2',
    price: 20,
    categoryIds: [1],
  },
]

describe('ProductCardList', () => {
  let store

  beforeEach(() => {
    store = mockStore(initialState)
    fetchProducts.mockResolvedValue({ products: mockProducts, hasNextPage: true })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <ProductCardList categoryId={0} setSelectedCategoryId={jest.fn()} shouldScrollUp={false} stopScrollUp={jest.fn()} {...props} />
      </Provider>,
    )
  }

  test('renders loading state correctly', () => {
    renderComponent()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  test('renders products correctly after loading', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })
  })

  test('loads more products when "View more" button is clicked', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })

    const viewMoreButton = screen.getByText('View more')
    fireEvent.click(viewMoreButton)

    await waitFor(() => {
      expect(fetchProducts).toHaveBeenCalledTimes(2)
    })
  })

  test('displays error message when there is an error', async () => {
    fetchProducts.mockRejectedValueOnce(new Error('Error loading products'))
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Error loading products')).toBeInTheDocument()
    })
  })

  test('displays "No products found" message when no products match the filter', async () => {
    fetchProducts.mockResolvedValueOnce({ products: [], hasNextPage: false })
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('No products found. Please reset the filter and try again!')).toBeInTheDocument()
    })
  })
})
