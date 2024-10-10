import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type FilterButtonsGridProps = {
  resetFilter: () => void
}

const FilterButtonsGrid = ({ resetFilter }: FilterButtonsGridProps) => {
  return (
    <div className="flex gap-16">
      <button type="button" className="flex items-center text-white" onClick={resetFilter}>
        <FontAwesomeIcon icon={faTimesCircle} className="text-yellow-500 mr-2" />
        Reset Filter
      </button>
      <button type="submit" className="w-[168px] btn">
        Search
      </button>
    </div>
  )
}

export default FilterButtonsGrid
