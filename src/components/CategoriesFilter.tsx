import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { fetchCategories } from '../api/categories'
import { Category } from '../types'

type CategoriesFilterProps = {
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  selectedCategoryId: number
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>
  scrollUp: () => void
}

const CategoriesFilter = ({ categories, setCategories, selectedCategoryId, setSelectedCategoryId, scrollUp }: CategoriesFilterProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories()
        setCategories([{ title: 'All', id: 0, slug: 'all', description: '' }, ...categoriesData])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategoriesData()
  }, [])

  const handleCategoryClick = (id: number) => {
    setSelectedCategoryId(id)
  }

  return (
    <div className="flex gap-4 overflow-x-auto custom-scrollbar p-2 cursor-grab select-none" ref={containerRef}>
      {categories.map((category: Category) => (
        <button key={category.slug} className={`btn text-sm shrink-0 ${selectedCategoryId === category.id ? '' : 'opacity-30'}`} onClick={() => handleCategoryClick(category.id)}>
          {category.title}
        </button>
      ))}
      <button className="btn opacity-30 hover:opacity-100 transition duration-300" onClick={scrollUp}>
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
    </div>
  )
}

export default CategoriesFilter
