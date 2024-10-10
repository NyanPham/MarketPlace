import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import PropertiesFilterForm from '../components/PropertiesFilterForm'
import { toggleSearchTrigger } from '../store/slices/filterFormSlice'
import SearchBar from '../components/SearchBar'
import PriceGlider from '../components/PriceGlider'
import CriteriaSelect from '../components/CriteriaSelect'
import FilterButtonsGrid from '../components/FilterButtonsGrid'
import { fetchTiers } from '../api/tiers'
import { fetchThemes } from '../api/themes'

jest.mock('../components/SearchBar', () => jest.fn(() => <div>SearchBar</div>))
jest.mock('../components/PriceGlider', () => jest.fn(() => <div>PriceGlider</div>))
jest.mock('../components/CriteriaSelect', () => jest.fn(() => <div>CriteriaSelect</div>))
jest.mock('../components/FilterButtonsGrid', () => jest.fn(() => <div>FilterButtonsGrid</div>))
jest.mock('../api/tiers')
jest.mock('../api/themes')

const mockStore = configureStore()

const initialState = {
  filter: {
    minPrice: 0,
    maxPrice: 100,
    searchValue: '',
    selectedTier: 0,
    selectedTheme: 0,
    sortedTime: 'ascending',
    sortedPrice: 'ascending',
    searchTrigger: false,
  },
}

describe('PropertiesFilterForm', () => {
  let store

  beforeEach(() => {
    store = mockStore(initialState)
    fetchTiers.mockResolvedValue([])
    fetchThemes.mockResolvedValue([])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <PropertiesFilterForm />
      </Provider>,
    )
  }

  test('renders correctly', () => {
    renderComponent()
    expect(screen.getByText('SearchBar')).toBeInTheDocument()
    expect(screen.getByText('PriceGlider')).toBeInTheDocument()
    expect(screen.getAllByText('CriteriaSelect').length).toBe(4)
    expect(screen.getByText('FilterButtonsGrid')).toBeInTheDocument()
  })

  test('renders SearchBar with correct props', () => {
    renderComponent()
    expect(SearchBar).toHaveBeenCalledWith(
      expect.objectContaining({
        searchValue: '',
        setSearchValue: expect.any(Function),
      }),
      {},
    )
  })

  test('renders PriceGlider with correct props', () => {
    renderComponent()
    expect(PriceGlider).toHaveBeenCalledWith(
      expect.objectContaining({
        minPrice: 0,
        maxPrice: 100,
        setminPrice: expect.any(Function),
        setmaxPrice: expect.any(Function),
      }),
      {},
    )
  })

  test('renders CriteriaSelect components with correct props', () => {
    renderComponent()
    expect(CriteriaSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Tier',
        options: expect.any(Array),
        selectedValue: 0,
        setSelectedValue: expect.any(Function),
      }),
      {},
    )
    expect(CriteriaSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Theme',
        options: expect.any(Array),
        selectedValue: 0,
        setSelectedValue: expect.any(Function),
      }),
      {},
    )
    expect(CriteriaSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Time',
        options: expect.any(Array),
        selectedValue: 'ascending',
        setSelectedValue: expect.any(Function),
      }),
      {},
    )
    expect(CriteriaSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Price',
        options: expect.any(Array),
        selectedValue: 'ascending',
        setSelectedValue: expect.any(Function),
      }),
      {},
    )
  })

  test('renders FilterButtonsGrid with correct props', () => {
    renderComponent()
    expect(FilterButtonsGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        resetFilter: expect.any(Function),
      }),
      {},
    )
  })

  test('updates state correctly when form is submitted', () => {
    renderComponent()
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    expect(store.getActions()).toContainEqual(toggleSearchTrigger(true))
  })
})
