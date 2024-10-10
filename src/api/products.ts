import { FiltersType, Product } from '../types'

const productCache: { [key: number]: Product } = {}

async function fetchProducts(filters: FiltersType, page: number = 1, pageSize: number = 10): Promise<{ products: Product[]; hasNextPage: boolean }> {
  const response = await fetch('/src/data/dev-products.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  const filteredData = data.filter((product: Product) => {
    if (filters.minPrice && product.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false
    }
    if (filters.searchValue && !product.title.toLowerCase().includes(filters.searchValue.toLowerCase())) {
      return false
    }
    if (filters.selectedTier && product.tierId !== filters.selectedTier) {
      return false
    }
    if (filters.selectedTheme && product.themeId !== filters.selectedTheme) {
      return false
    }
    return true
  })

  const sortedData = filteredData
    .sort((a: Product, b: Product) => {
      if (filters.sortedTime === 'ascending') {
        return new Date(a.releasedAt).getTime() - new Date(b.releasedAt).getTime()
      } else if (filters.sortedTime === 'descending') {
        return new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
      }
      return 0
    })
    .sort((a: Product, b: Product) => {
      if (filters.sortedPrice === 'ascending') {
        return a.price - b.price
      } else if (filters.sortedPrice === 'descending') {
        return b.price - a.price
      }
      return 0
    })

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = sortedData.slice(startIndex, endIndex)
  const hasNextPage = endIndex < sortedData.length

  paginatedData.forEach((product: Product) => {
    productCache[product.id] = product
  })

  return { products: paginatedData, hasNextPage }
}

async function fetchProductById(productId: number): Promise<Product> {
  if (productCache[productId]) {
    return productCache[productId]
  }

  const response = await fetch('/src/data/dev-products.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = (await response.json()) as Product[]
  const product = data.find((pd: Product) => pd.id === productId) as Product

  productCache[productId] = product
  return product
}

export { fetchProducts, fetchProductById }
