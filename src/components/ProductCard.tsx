import { useEffect, useState } from 'react'
import { Product, Tier, User } from '../types'
import { fetchTierById } from '../api/tiers'
import { fetchUserById } from '../api/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import eth from '/assets/logos_ethereum.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'react-toastify'

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [tier, setTier] = useState<Tier | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const tierData = await fetchTierById(product.tierId)
      const userData = await fetchUserById(product.creatorId)
      setTier(tierData)
      setUser(userData)
      setLoading(false)
    }

    fetchData()
  }, [product.tierId, product.creatorId])

  const handleAddWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    toast.info('Feature in development. Pleease come back later!')
  }

  return (
    <a href={`/products/${product.id}`} className="block bg-gray-800 bg-opacity-60 p-4 pb-5 rounded-lg">
      <div className="relative">
        {loading ? <Skeleton height={200} /> : <img src={product.imageUrl} alt={product.title} className="w-full h-auto rounded-md" />}
        {tier && !loading && <div className="absolute top-2 left-2 bg-gray-700 bg-opacity-50 text-white text-xs px-2 py-1 leading-4 pb-2 rounded-sm">{tier.title}</div>}
        <button className="absolute top-2 right-2 text-red-500 text-xl" onClick={handleAddWishlist}>
          <FontAwesomeIcon icon={faHeart} className="text-white" />
        </button>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-lg truncate max-w-full">{loading ? <Skeleton width={150} /> : product.title}</h2>
          <p className="text-white gap-4">
            <img src={eth} alt="Logo ETH" className="inline mr-2 pb-1" />
            {loading ? <Skeleton width={50} /> : `${product.price.toString().replace('.', ',')} ETH`}
          </p>
        </div>
        <div className="flex items-center mt-4 max-w-full">
          {loading ? <Skeleton circle={true} height={24} width={24} /> : <img src={user?.profileImageUrl} alt={user?.name} className="w-6 h-6 rounded-full mr-2" />}
          <span className="text-white truncate max-w-full">{loading ? <Skeleton width={100} /> : user?.name}</span>
        </div>
      </div>
    </a>
  )
}

export default ProductCard
