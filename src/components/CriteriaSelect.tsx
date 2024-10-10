import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropertyFilterItem from './PropertyFilterItem'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export type CriteriaSelectOption = {
  name: string
  value: string | number
  isDefault: boolean
}

type CriteriaSelectProps = {
  title: string
  options: CriteriaSelectOption[]
  selectedValue: string | number
  setSelectedValue: (value: string | number) => void
}

const CriteriaSelect = ({ title, options, selectedValue, setSelectedValue }: CriteriaSelectProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value)
    console.log(e.target.value)
    e.target.blur()
  }

  return (
    <PropertyFilterItem title={title} titleClasses="text-secondary">
      <div className="relative mt-4 w-full">
        <select
          className="select input appearance-none bg-transparent text-white border border-[#89888B] rounded-[4px] py-2 px-6 focus:outline-none focus:ring focus:ring-[#DA458F] focus:ring-offset-4 transition duration-100"
          value={selectedValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#3A3841]">
              {option.name}
            </option>
          ))}
        </select>
        <FontAwesomeIcon icon={faAngleDown} className={`text-white absolute right-4 top-1/2 -translate-y-1/2 transition duration-100 ${isFocused ? 'rotate-180' : 'rotate-0'}`} />
      </div>
    </PropertyFilterItem>
  )
}

export default CriteriaSelect
