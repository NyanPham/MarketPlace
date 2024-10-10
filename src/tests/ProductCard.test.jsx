import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../components/ProductCard'
import { fetchTierById } from '../api/tiers'
import { fetchUserById } from '../api/users'
import { toast } from 'react-toastify'

// Mock the API functions
jest.mock('../api/tiers')
jest.mock('../api/users')
jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
  },
}))

const mockProduct = {
  id: '1',
  title: 'Test Product',
  imageUrl: 'test-image-url',
  price: 1.23,
  tierId: 'tier1',
  creatorId: 'user1',
}

const mockTier = {
  id: 'tier1',
  title: 'Gold Tier',
}

const mockUser = {
  id: 'user1',
  name: 'John Doe',
  profileImageUrl: 'test-profile-image-url',
}

describe('ProductCard', () => {
  beforeEach(() => {
    fetchTierById.mockResolvedValue(mockTier)
    fetchUserById.mockResolvedValue(mockUser)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading state correctly', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  test('renders product details correctly after loading', async () => {
    render(<ProductCard product={mockProduct} />)

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
      expect(screen.getByText(`${mockProduct.price.toString().replace('.', ',')} ETH`)).toBeInTheDocument()
      expect(screen.getByText(mockTier.title)).toBeInTheDocument()
      expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    })
  })

  test('calls handleAddWishlist when wishlist button is clicked', async () => {
    render(<ProductCard product={mockProduct} />)

    await waitFor(() => {
      const wishlistButton = screen.getByRole('button')
      fireEvent.click(wishlistButton)
      expect(toast.info).toHaveBeenCalledWith('Feature in development. Pleease come back later!')
    })
  })

  test('renders tier and user information correctly', async () => {
    render(<ProductCard product={mockProduct} />)

    await waitFor(() => {
      expect(screen.getByText(mockTier.title)).toBeInTheDocument()
      expect(screen.getByAltText(mockUser.name)).toBeInTheDocument()
    })
  })
})
