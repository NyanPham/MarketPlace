import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  setminPrice,
  setmaxPrice,
  setSearchValue,
  setSelectedTier,
  setSelectedTheme,
  setsortedTime,
  setsortedPrice,
  resetFilter,
  toggleSearchTrigger,
} from '../store/slices/filterFormSlice'
import SearchBar from './SearchBar'
import PriceGlider from './PriceGlider'
import CriteriaSelect, { CriteriaSelectOption } from './CriteriaSelect'
import FilterButtonsGrid from './FilterButtonsGrid'
import { useEffect, useState } from 'react'
import { fetchTiers } from '../api/tiers'
import { fetchThemes } from '../api/themes'
import { Tier, Theme } from '../types'

const timeOptions: CriteriaSelectOption[] = [
  { name: 'All', value: 0, isDefault: true },
  { name: 'Latest', value: 'ascending', isDefault: false },
  { name: 'Oldest', value: 'descending', isDefault: false },
]

const priceOptions: CriteriaSelectOption[] = [
  { name: 'All', value: 0, isDefault: true },
  { name: 'Low to High', value: 'ascending', isDefault: false },
  { name: 'High to Low', value: 'descending', isDefault: false },
]

const PropertiesFilterForm = () => {
  const dispatch = useDispatch()
  const { minPrice, maxPrice, searchValue, selectedTier, selectedTheme, sortedTime, sortedPrice } = useSelector((state: RootState) => state.filter)
  const [tierOptions, setTierOptions] = useState<CriteriaSelectOption[]>([])
  const [themeOptions, setThemeOptions] = useState<CriteriaSelectOption[]>([])

  useEffect(() => {
    const loadTiers = async () => {
      try {
        const tiers = await fetchTiers()
        const options = tiers.map((tier: Tier) => ({
          name: tier.title,
          value: tier.id,
          isDefault: false,
        }))
        setTierOptions([{ name: 'All', value: 0, isDefault: true }, ...options])
      } catch (error) {
        console.error('Failed to fetch tiers:', error)
      }
    }

    const loadThemes = async () => {
      try {
        const themes = await fetchThemes()
        const options = themes.map((theme: Theme) => ({
          name: theme.title,
          value: theme.id,
          isDefault: false,
        }))
        setThemeOptions([{ name: 'All', value: 0, isDefault: true }, ...options])
      } catch (error) {
        console.error('Failed to fetch themes:', error)
      }
    }

    loadTiers()
    loadThemes()
  }, [])

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(toggleSearchTrigger(true))
  }

  return (
    <div className="w-96">
      <form onSubmit={handleFilterSubmit} className="flex flex-col gap-8">
        <SearchBar searchValue={searchValue} setSearchValue={(value) => dispatch(setSearchValue(value))} />
        <PriceGlider minPrice={minPrice} maxPrice={maxPrice} setminPrice={(value) => dispatch(setminPrice(value))} setmaxPrice={(value) => dispatch(setmaxPrice(value))} />
        <CriteriaSelect title="Tier" options={tierOptions} selectedValue={selectedTier} setSelectedValue={(value) => dispatch(setSelectedTier(Number(value)))} />
        <CriteriaSelect title="Theme" options={themeOptions} selectedValue={selectedTheme} setSelectedValue={(value) => dispatch(setSelectedTheme(Number(value)))} />
        <CriteriaSelect title="Time" options={timeOptions} selectedValue={sortedTime} setSelectedValue={(value) => dispatch(setsortedTime(value))} />
        <CriteriaSelect title="Price" options={priceOptions} selectedValue={sortedPrice} setSelectedValue={(value) => dispatch(setsortedPrice(value))} />
        <FilterButtonsGrid resetFilter={() => dispatch(resetFilter())} />
      </form>
    </div>
  )
}

export default PropertiesFilterForm
