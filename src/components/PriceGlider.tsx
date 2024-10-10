import React, { useState, useEffect, useRef } from 'react'
import PropertyFilterItem from './PropertyFilterItem'
import '../styles/PriceGliderStyle.css'

type PriceGliderProps = {
  minPrice: number
  maxPrice: number
  setminPrice: (value: number) => void
  setmaxPrice: (value: number) => void
}

const PRICE_RANGE_MIN = 0
const PRICE_RANGE_MAX = 100
const CURRENCY = 'ETH'

const PriceGlider = ({ minPrice, maxPrice, setminPrice, setmaxPrice }: PriceGliderProps) => {
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null)
  const minKnobRef = useRef<HTMLDivElement>(null)
  const maxKnobRef = useRef<HTMLDivElement>(null)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value), PRICE_RANGE_MIN), maxPrice - 1)
    setminPrice(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Math.min(Number(e.target.value), PRICE_RANGE_MAX), minPrice + 1)
    setmaxPrice(value)
  }

  const handleDragStart = (type: 'min' | 'max') => {
    setDragging(type)
  }

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (dragging) {
      const slider = e.currentTarget as HTMLDivElement
      const rect = slider.getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const percent = (offsetX / rect.width) * 100
      if (dragging === 'min') {
        setminPrice(Math.min(Math.max(percent, PRICE_RANGE_MIN), maxPrice - 0.1))
      } else if (dragging === 'max') {
        setmaxPrice(Math.max(Math.min(percent, PRICE_RANGE_MAX), minPrice + 0.1))
      }
    }
  }

  const minPercent = (minPrice / PRICE_RANGE_MAX) * 100
  const maxPercent = (maxPrice / PRICE_RANGE_MAX) * 100

  useEffect(() => {
    const handleMouseUp = () => setDragging(null)
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <PropertyFilterItem title="Price" titleClasses="mt-4 text-white">
      <div className="price-glider mb-8" onMouseMove={handleMouseMove}>
        <div className="line-segment left-segment" style={{ width: `${minPercent}%` }}></div>
        <div className="line-segment middle-segment" style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
        <div className="line-segment right-segment" style={{ left: `${maxPercent}%`, width: `${100 - maxPercent}%` }}></div>
        <div className={`tooltip font-semibold min ${dragging === 'min' ? 'visible' : ''}`} style={{ left: `${minPercent}%` }}>
          {minPrice.toFixed(2)} {CURRENCY}
        </div>

        <div className={`tooltip font-semibold max ${dragging === 'max' ? 'visible' : ''}`} style={{ left: `${maxPercent}%` }}>
          {maxPrice.toFixed(2)} {CURRENCY}
        </div>

        <input type="range" min={PRICE_RANGE_MIN} max={PRICE_RANGE_MAX} step="0.01" value={minPrice} onChange={handleMinChange} className="knob min-knob" />
        <input type="range" min={PRICE_RANGE_MIN} max={PRICE_RANGE_MAX} step="0.01" value={maxPrice} onChange={handleMaxChange} className="knob max-knob" />

        <div ref={minKnobRef} className="knob" style={{ left: `${minPercent}%` }} onMouseDown={() => handleDragStart('min')}></div>
        <div ref={maxKnobRef} className="knob" style={{ left: `${maxPercent}%` }} onMouseDown={() => handleDragStart('max')}></div>

        <input type="hidden" value={minPrice} name="minPrice" min={PRICE_RANGE_MIN} max={PRICE_RANGE_MAX} />
        <input type="hidden" value={maxPrice} name="maxPrice" min={PRICE_RANGE_MIN} max={PRICE_RANGE_MAX} />

        <div className="price-labels">
          <div className="min-price text-[#D6D6D6] font-medium">
            {minPrice.toFixed(2)} {CURRENCY}
          </div>
          <div className="max-price text-[#D6D6D6] font-medium">
            {maxPrice.toFixed(2)} {CURRENCY}
          </div>
        </div>
      </div>
    </PropertyFilterItem>
  )
}

export default PriceGlider
