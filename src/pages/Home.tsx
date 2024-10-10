import Banner from '../components/Banner'
import MainContent from '../components/MainContent'
import StarryBackground from '../components/StarryBackground'
import endBody from '/assets/end-body.png'

const Home = () => {
  return (
    <>
      <Banner />
      <div className="relative min-h-screen font-inter">
        <StarryBackground />
        <MainContent />
        <img src={endBody} alt="Background style" />
      </div>
    </>
  )
}

export default Home
