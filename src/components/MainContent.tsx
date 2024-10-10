import CategoriesFilter from './CategoriesFilter'
import Container from './Container'
import ProductCardList from './ProductCardList'
import PropertiesFilterForm from './PropertiesFilterForm'

const MainContent = () => {
  return (
    <Container>
      <div className="flex pt-28 w-full gap-8">
        <PropertiesFilterForm />
        <div className="flex flex-col gap-8 overflow-x-auto">
          <CategoriesFilter />
          <ProductCardList />
        </div>
      </div>
    </Container>
  )
}

export default MainContent
