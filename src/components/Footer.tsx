import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from './Container'
import { faMessage, faPhone } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast.info('Feature in development. Pleease come back later!')
  }

  return (
    <div className="bg-[#17161A] text-white py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="mb-6 flex flex-col lg:flex-row justify-between">
          <div className="flex-1 mx-2 mb-16 lg:mb-0">
            <div className="text-2xl mb-2 font-drone">Navigation</div>
            <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Link to="#" className="text-lg mb-3 sm:mb-5 block">
                  Home
                </Link>
                <Link to="#" className="text-lg mb-3 sm:mb-5 block">
                  About Us
                </Link>
                <Link to="#" className="text-lg block">
                  Our Teams
                </Link>
              </div>
              <div>
                <Link to="#" className="text-lg mb-3 sm:mb-5 block">
                  Whitepaper
                </Link>
                <Link to="#" className="text-lg mb-3 sm:mb-5 block">
                  Marketplace
                </Link>
                <Link to="#" className="text-lg block">
                  Roadmap
                </Link>
              </div>
              <div>
                <Link to="#" className="text-lg mb-3 sm:mb-5 block">
                  FAQs
                </Link>
                <Link to="#" className="text-lg mb-3 sm:mb-5 block">
                  News
                </Link>
                <Link to="#" className="text-lg block">
                  Community
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 mx-2 mb-16 lg:mb-0">
            <div className="text-2xl mb-2 font-drone">Contact Us</div>
            <div className="mt-6 sm:mt-8 lg:mt-12 flex items-center mb-4 sm:mb-8">
              <div className="w-6 h-6 bg-white rounded-full mr-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faPhone} className="text-[#17161A] text-xs" />
              </div>
              <div className="text-lg ml-3">012345678910</div>
            </div>
            <div className="flex items-center">
              <div className="block relative after:content-[''] after:block after:absolute after:w-3 after:h-0.5 after:bg-black after:top-1.5 after:left-1 after:rounded-sm before:content-[''] before:block before:absolute before:w-2 before:h-0.5 before:bg-black before:top-2.5 before:left-1 before:rounded-sm">
                <FontAwesomeIcon icon={faMessage} className="block w-6 h-6 text-white mr-2" />
              </div>
              <div className="text-lg ml-3">tymex-talent@tyme.com</div>
            </div>
          </div>
          <div className="flex-1 mx-2" style={{ flexBasis: '12%' }}>
            <div className="text-2xl mb-2 font-drone">Subscribe to receive our latest update</div>
            <form className="mt-6 sm:mt-8 lg:mt-12 flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Your email address" className="flex-1 mb-2 sm:mb-0 sm:mr-2 input" />
              <button className="btn p-2 bg-blue-500 text-white w-full sm:w-40">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 mt-8 sm:mt-10 lg:mt-12 border-t border-[#3A3841]">
          <div className="text-lg mb-2 sm:mb-0">@2023 Tyme - Edit. All Rights reserved.</div>
          <div className="text-lg flex gap-4 sm:gap-8">
            <Link to="#">Security</Link>
            <Link to="#">Legal</Link>
            <Link to="#">Privacy</Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
