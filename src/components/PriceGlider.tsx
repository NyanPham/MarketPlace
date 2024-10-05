import { useState } from "react"

const PriceGlider = () => {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value < min) {
      setMin(value)
    } else if (value > max) {
      setMax(value)
    }

  }
  const handleMinChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect()
    const value = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    setMin(value)
  }
  
  const handleMaxChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect()
    const value = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    setMax(value)
  }

  return (  
    <div className="relative">
      <div className="absolute inset-0 bg-gray-500 h-1"></div>
      <div className="absolute inset-0 bg-red-500 h-1" style={{ left: `${min}%`, right: `${100 - max}%` }}></div>
      <input type="range" className="hidden" min={0} max={100} value={(min + max) / 2} onChange={handleRangeChange} />
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full" style={{ left: `${min}%` }} onMouseDown={handleMinChange} />
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full" style={{ right: `${100 - max}%` }} onMouseDown={handleMaxChange} />
    </div>
  )
}

export default PriceGlider



