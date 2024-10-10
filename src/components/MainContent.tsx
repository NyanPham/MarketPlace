import Container from './Container'
import ProductsWithCategorisFilter from './ProductsWithCategorisFilter'
import PropertiesFilterForm from './PropertiesFilterForm'

const MainContent = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row pt-28 w-full gap-8">
        <PropertiesFilterForm />
        <ProductsWithCategorisFilter />
      </div>
    </Container>
  )
}

export default MainContent
