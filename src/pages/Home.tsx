import Banner from "../components/Banner"
import Header from "../components/Header"
import MainContent from "../components/MainContent"
import StarryBackground from "../components/StarryBackground"

const Home = () => {
  return (
    <>
        <Header />
        <Banner />
        <div className="relative h-screen">
            <StarryBackground />
            <MainContent />
        </div>
    </>
  )
}

export default Home