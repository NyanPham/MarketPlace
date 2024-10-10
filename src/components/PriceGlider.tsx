import React, { useState } from 'react'
import '../styles/PriceGliderStyle.css'
import PropertyFilterItem from './PropertyFilterItem'

type PriceGliderProps = {
  minPrice: number
  maxPrice: number
  setminPrice: (value: number) => void
  setmaxPrice: (value: number) => void
}

const PriceGlider = ({ minPrice, maxPrice, setminPrice, setmaxPrice }: PriceGliderProps) => {
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1)
    setminPrice(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1)
    setmaxPrice(value)
  }

  const handleDragStart = (type: 'min' | 'max') => {
    setDragging(type)
  }

  const handleDragEnd = () => {
    setDragging(null)
  }

  const minPercent = (minPrice / 100) * 100
  const maxPercent = (maxPrice / 100) * 100

  return (
    <PropertyFilterItem title="Price" titleClasses="mt-4 text-white">
      <div className="price-glider mb-8">
        <div className="line-segment left-segment" style={{ width: `${minPercent}%` }}></div>
        <div className="line-segment middle-segment" style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
        <div className="line-segment right-segment" style={{ left: `${maxPercent}%`, width: `${100 - maxPercent}%` }}></div>

        <div className={`tooltip font-semibold min ${dragging === 'min' ? 'visible' : ''}`} style={{ left: `${minPercent}%` }}>
          {minPrice} ETH
        </div>

        <div className={`tooltip font-semibold max ${dragging === 'max' ? 'visible' : ''}`} style={{ left: `${maxPercent}%` }}>
          {maxPrice} ETH
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="0.01"
          value={minPrice}
          onChange={handleMinChange}
          onMouseDown={() => handleDragStart('min')}
          onMouseUp={handleDragEnd}
          className="knob min-knob"
          title="min knob"
          placeholder=""
        />

        <input
          type="range"
          min="0"
          max="100"
          step="0.01"
          value={maxPrice}
          onChange={handleMaxChange}
          onMouseDown={() => handleDragStart('max')}
          onMouseUp={handleDragEnd}
          className="knob max-knob"
          title="max knob"
          placeholder=""
        />

        <input type="hidden" value={minPrice} name="minPrice" />
        <input type="hidden" value={maxPrice} name="maxPrice" />

        <div className="price-labels">
          <div className="min-price text-[#D6D6D6] font-medium">{minPrice} ETH</div>
          <div className="max-price text-[#D6D6D6] font-medium">{maxPrice} ETH</div>
        </div>
      </div>
    </PropertyFilterItem>
  )
}

export default PriceGlider
