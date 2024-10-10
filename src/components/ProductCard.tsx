import { Product } from '../types'

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
      <img src={product.imageUrl} alt={product.title} />
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Released at: {product.releasedAt}</p>
    </div>
  )
}

export default ProductCard
