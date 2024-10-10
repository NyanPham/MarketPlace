import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from './Container'
import { faMessage, faPhone } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast('Feature in development. Pleease come back later!')
  }

  return (
    <div className="bg-[#17161A] text-white py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="mb-6 flex flex-col lg:flex-row justify-between">
          <div className="flex-1 mx-2 mb-16 lg:mb-0">
            <div className="text-2xl mb-2 font-drone">Navigation</div>
            <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <a href="#" className="text-lg mb-3 sm:mb-5 block">
                  Home
                </a>
                <a href="#" className="text-lg mb-3 sm:mb-5 block">
                  About Us
                </a>
                <a href="#" className="text-lg block">
                  Our Teams
                </a>
              </div>
              <div>
                <a href="#" className="text-lg mb-3 sm:mb-5 block">
                  Whitepaper
                </a>
                <a href="#" className="text-lg mb-3 sm:mb-5 block">
                  Marketplace
                </a>
                <a href="#" className="text-lg block">
                  Roadmap
                </a>
              </div>
              <div>
                <a href="#" className="text-lg mb-3 sm:mb-5 block">
                  FAQs
                </a>
                <a href="#" className="text-lg mb-3 sm:mb-5 block">
                  News
                </a>
                <a href="#" className="text-lg block">
                  Community
                </a>
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
              <div className="w-6 h-6 bg-white rounded-full mr-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faMessage} className="text-[#17161A] text-xs" />
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
            <a href="#">Security</a>
            <a href="#">Legal</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
