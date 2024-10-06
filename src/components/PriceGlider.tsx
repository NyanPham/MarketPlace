import React, { useState } from 'react'
import '../styles/PriceGliderStyle.css'
import PropertyFilterItem from './PropertyFilterItem'

const PriceGlider = () => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100)
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1)

    setMinValue(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1)

    setMaxValue(value)
  }

  const handleDragStart = (type: 'min' | 'max') => {
    setDragging(type)
  }

  const handleDragEnd = () => {
    setDragging(null)
  }

  const minPercent = (minValue / 100) * 100
  const maxPercent = (maxValue / 100) * 100
    
  return (
    <PropertyFilterItem title='Price'>
      <div className="price-glider">
            {/* <div className="line"></div> */}
            <div className="line-segment left-segment" style={{ width: `${minPercent}%` }}></div>
            <div className="line-segment middle-segment" style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
            <div className="line-segment right-segment" style={{ left: `${maxPercent}%`, width: `${100 - maxPercent}%` }}></div>

            <div className={`tooltip ${dragging === 'min' ? 'visible' : ''}`} style={{ left: `${minPercent}%` }}>
              {minValue}
            </div>

            <div className={`tooltip ${dragging === 'max' ? 'visible' : ''}`} style={{ left: `${maxPercent}%` }}>
              {maxValue}
            </div>
              
            <input
              type="range"
              min="0"
              max="100"
              value={minValue}
              onChange={handleMinChange}
              onMouseDown={() => handleDragStart('min')}
              onMouseUp={handleDragEnd}
              className="knob min-knob"
            />

            <input
              type="range"
              min="0"
              max="100"
              value={maxValue}
              onChange={handleMaxChange}
              onMouseDown={() => handleDragStart('max')}
              onMouseUp={handleDragEnd}
              className="knob max-knob"
            />

            <input type="hidden" value={minValue} name="minValue" />

            <input type="hidden" value={maxValue} name="maxValue" />
            
            <div className="price-labels">
              <div className="min-price">Min: ${minValue}</div>

              <div className="max-price">Max: ${maxValue}</div>
            </div>
          </div>
    </PropertyFilterItem>
  )
}

export default PriceGlider
