import React, { useState } from 'react'
import CategoriesFilter from './CategoriesFilter'
import ProductCardList from './ProductCardList'
import { Category } from '../types'

const ProductsWithCategorisFilter = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(0)
  const [shouldScrollUp, setShouldScrollUp] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-8 overflow-x-auto">
      <CategoriesFilter
        categories={categories}
        setCategories={setCategories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        scrollUp={() => setShouldScrollUp(true)}
      />
      <ProductCardList
        categoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        shouldScrollUp={shouldScrollUp}
        stopScrollUp={() => setShouldScrollUp(false)}
      />
    </div>
  )
}

export default ProductsWithCategorisFilter
