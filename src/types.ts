export type User = {
  id: number
  name: string
  profileImageUrl?: string
  role: 'seller' | 'buyer' | 'admin'
}

export type Tier = {
  id: number
  title: string
  description?: string
}

export type Theme = {
  id: number
  title: string
  description?: string
}

export type Category = {
  id: number
  title: string
  slug: string
  description?: string
}

export type Product = {
  id: number
  imageUrl: string
  tierId: number
  creatorId: number
  themeId: number
  categoryIds: number[]
  title: string
  price: number
  releasedAt: string
  description?: string
}

export type FiltersType = {
  minPrice: number
  maxPrice: number
  searchValue: string
  selectedTier: string | number
  selectedTheme: string | number
  sortedTime: 'ascending' | 'descending'
  sortedPrice: 'ascending' | 'descending'
}
