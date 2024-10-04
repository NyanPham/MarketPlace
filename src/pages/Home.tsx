import Banner from "../components/Banner"
import Header from "../components/Header"
import StarryBackground from "../components/StarryBackground"

const Home = () => {
  return (
    <>
        <Header />
        <Banner />
        <div className="relative h-screen">
            <StarryBackground />
        </div>
    </>
  )
}

export default Home