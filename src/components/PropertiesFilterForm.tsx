import CriteriaSelect from "./CriteriaSelect"
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
       <CriteriaSelect title="Tier" options={[
          {
            name: "All",
             value: "all"
          }, 
          {
            name: "Epic",
            value: "epic"
          }
        ]} />
        <CriteriaSelect title="Theme" options={[
          {
            name: "All",
             value: "all"
          }, 
          {
            name: "Halloween",
            value: "halloween"
          }
        ]} />
        <CriteriaSelect title="Time" options={[
          {
            name: "All",
             value: "all"
          }, 
          {
            name: "Latest",
            value: "latest"
          }
        ]} />
        <CriteriaSelect title="Price" options={[
          {
            name: "All",
             value: "all"
          }, 
          {
            name: "Low to High",
            value: "ascending"
          }
        ]} />
      </form>
    </div>
  )
}

export default PropertiesFilterForm