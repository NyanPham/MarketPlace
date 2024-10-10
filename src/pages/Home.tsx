import Banner from '../components/Banner'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import StarryBackground from '../components/StarryBackground'
import endBody from '../../public/assets/end-body.png'

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className="relative min-h-screen pb-8">
        <StarryBackground />
        <MainContent />
        <img src={endBody} alt="Background style" />
      </div>
    </>
  )
}

export default Home
