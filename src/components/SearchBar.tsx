import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <FontAwesomeIcon icon={faSearch} className="text-secondary absolute top-1/2 left-4 -translate-y-1/2" />
      <input className="input pl-10 placeholder:text-secondary" type="search" name="quick-search" id="quick-search" placeholder="Quick Search" />
    </div>
  )
}

export default SearchBar