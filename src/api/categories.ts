import { Category } from '../types'

const categoryCache: { [key: number]: Category } = {}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/src/data/dev-categories.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  data.forEach((category: Category) => {
    categoryCache[category.id] = category
  })

  return data as Category[]
}

async function fetchCategoryById(categoryId: number): Promise<Category> {
  if (categoryCache[categoryId]) {
    return categoryCache[categoryId]
  }

  const response = await fetch(`/src/data/dev-categorys.json`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  const category = data.find((category: Category) => category.id === categoryId) as Category

  categoryCache[categoryId] = category
  return category
}

export { fetchCategories, fetchCategoryById }
