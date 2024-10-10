import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Upper Body', value: 'upper-body' },
  { name: 'Lower Body', value: 'lower-body' },
  { name: 'Hat', value: 'hat' },
  { name: 'Shoes', value: 'shoes' },
  { name: 'Accessory', value: 'accessory' },
  { name: 'Legendary', value: 'legendary' },
  { name: 'Mythic', value: 'mythic' },
  { name: 'Epic', value: 'epic' },
  { name: 'Rare', value: 'rare' },
]

const CategoriesFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isClick, setIsClick] = useState(true)

  const handleCategoryClick = (value: string) => {
    if (isClick) {
      setSelectedCategory(value)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true)
      setIsClick(true)
      setStartX(e.pageX - containerRef.current.offsetLeft)
      setScrollLeft(containerRef.current.scrollLeft)
    }
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    setIsClick(false)
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Adjust the scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      className="flex gap-6 overflow-x-auto custom-scrollbar p-2 cursor-grab select-none"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {categories.map((category) => (
        <button key={category.value} className={`btn shrink-0 ${selectedCategory === category.value ? '' : 'opacity-30'}`} onClick={() => handleCategoryClick(category.value)}>
          {category.name}
        </button>
      ))}
      <button className="btn opacity-30">
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
    </div>
  )
}

export default CategoriesFilter
