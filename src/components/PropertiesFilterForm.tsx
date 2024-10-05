import PriceGlider from "./PriceGlider"
import SearchBar from "./SearchBar"

const PropertiesFilterForm = () => {
  
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  } 

  return (  
    <div className="w-96">
      <form onSubmit={handleFilterSubmit} className="flex flex-col gap-12">
        <SearchBar />
        <PriceGlider />
      </form>
    </div>
  )
}

export default PropertiesFilterForm