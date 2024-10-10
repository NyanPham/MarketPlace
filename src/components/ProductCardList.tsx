import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { FiltersType, Product } from '../types'
import { toggleSearchTrigger } from '../store/slices/filterFormSlice'
import debounce from 'lodash.debounce'
import { fetchProducts } from '../api/products'
import ProductCard from './ProductCard'

const ProductCardList = () => {
  const dispatch = useDispatch()
  const { minPrice, maxPrice, searchValue, selectedTier, selectedTheme, sortedTime, sortedPrice, searchTrigger } = useSelector((state: RootState) => state.filter)
  const [products, setProducts] = useState<Product[]>([])

  const debouncedFetchProducts = useCallback(
    debounce(async (filters: FiltersType) => {
      const data = await fetchProducts(filters)
      console.log(data)
      setProducts(data)
    }, 300),
    [],
  )

  useEffect(() => {
    if (searchTrigger !== true) return

    const filters: FiltersType = {
      minPrice,
      maxPrice,
      searchValue,
      selectedTier,
      selectedTheme,
      sortedTime: sortedTime as 'ascending' | 'descending',
      sortedPrice: sortedPrice as 'ascending' | 'descending',
    }

    debouncedFetchProducts(filters)
    dispatch(toggleSearchTrigger(false))
  }, [searchTrigger, dispatch, minPrice, maxPrice, searchValue, selectedTier, selectedTheme, sortedTime, sortedPrice, debouncedFetchProducts])

  return (
    <div>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductCardList
