import CategoriesFilter from "./CategoriesFilter"
import Container from "./Container"
import PropertiesFilterForm from "./PropertiesFilterForm"

const MainContent = () => {
  return (
    <Container>
      <div className="flex pt-28 w-full">
        <PropertiesFilterForm />
        <CategoriesFilter />
      </div>
    </Container>
  )
}

export default MainContent