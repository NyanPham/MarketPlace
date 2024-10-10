import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { FiltersType, Product } from '../types'
import { toggleSearchTrigger } from '../store/slices/filterFormSlice'
import ProductCard from './ProductCard'
import useFetch from '../hooks/useFetch'
import { fetchProducts } from '../api/products'
import LoadingLayer from './LoadingLayer'
import useOnScreen from '../hooks/useOnScreen'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type ProductCardListProps = {
  categoryId: number
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>
  shouldScrollUp: boolean
  stopScrollUp: () => void
}

const ProductCardList = ({ categoryId, setSelectedCategoryId, shouldScrollUp, stopScrollUp }: ProductCardListProps) => {
  const dispatch = useDispatch()
  const { minPrice, maxPrice, searchValue, selectedTier, selectedTheme, sortedTime, sortedPrice, searchTrigger } = useSelector((state: RootState) => state.filter)
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const inViewRef = useRef<HTMLDivElement | null>(null)
  const inView = useOnScreen(inViewRef, '-70px')
  const firstRender = useRef<boolean>(true)

  const filters: FiltersType = {
    minPrice,
    maxPrice,
    searchValue,
    selectedTier,
    selectedTheme,
    sortedTime: sortedTime as 'ascending' | 'descending',
    sortedPrice: sortedPrice as 'ascending' | 'descending',
  }

  const fetchFunction = () => fetchProducts(filters, page)
  const { loading, error, value } = useFetch(fetchFunction, [page, searchTrigger])
  const productsInCategory = products.filter((product) => categoryId === 0 || product.categoryIds.includes(categoryId))

  useEffect(() => {
    if (value) {
      setProducts((prevProducts) => [...prevProducts, ...value.products])
      setHasNextPage(value.hasNextPage)
      setSelectedCategoryId(0)
    }
  }, [value])

  useEffect(() => {
    if (searchTrigger) {
      setProducts([])
      setPage(1)
      dispatch(toggleSearchTrigger(false))
    }
  }, [searchTrigger, dispatch])

  useEffect(() => {
    if (!firstRender.current || !inView) return

    firstRender.current = false
  }, [inView])

  useEffect(() => {
    if (shouldScrollUp) {
      inViewRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      stopScrollUp()
    }
  }, [shouldScrollUp, stopScrollUp])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <>
      <div className="product-card-list max-h-[calc(5*theme(spacing.80))] overflow-y-auto" ref={inViewRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading && productsInCategory.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-60 p-4 pb-5 rounded-lg">
                  <Skeleton height={200} />
                  <div className="mt-4">
                    <Skeleton width={150} />
                    <Skeleton width={50} />
                    <div className="flex items-center mt-4">
                      <Skeleton circle={true} height={24} width={24} />
                      <Skeleton width={100} />
                    </div>
                  </div>
                </div>
              ))
            : productsInCategory.map((product: Product) => <ProductCard key={product.id} product={product} />)}
        </div>
        {error && <div className="text-center mt-4 text-red-500 text-2xl">Error loading products</div>}
        {!loading && productsInCategory.length === 0 && <div className="text-center mt-4 text-white text-2xl">No products found. Please reset the filter and try again!</div>}
      </div>
      {hasNextPage && !firstRender.current && !searchTrigger && (
        <div className="flex justify-center mt-8">
          <button onClick={loadMore} className="btn w-80 py-5 font-medium" disabled={loading}>
            {!loading ? 'View more' : 'Loading'}
          </button>
        </div>
      )}
      <LoadingLayer isVisible={loading && (inView || !firstRender.current)} />
    </>
  )
}

export default ProductCardList
