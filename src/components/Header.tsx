import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCaretDown, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useToggle } from '../hooks/useToggle'
import Container from './Container'

const Header = () => {
  const [dropdownShown, toggleDropdown, setDropdown] = useToggle(false)
  const [burgerShown, toggleBurger] = useToggle(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
      setDropdown(false)
    }
  }

  useEffect(() => {
    if (dropdownShown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownShown])

  return (
    <header className="bg-[#17161A]/50 fixed top-0 left-0 w-full z-10 font-drone">
      <Container>
        <nav className="flex items-center justify-between text-white font-semibold uppercase font-drone text-sm px-6 py-2 lg:px-12 lg:py-6">
          <ul className="hidden lg:flex items-center justify-around">
            <li className="mr-6">
              <a href="#" className="text-lg">
                Home
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="text-lg">
                About us
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="text-lg">
                Our teams
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="text-lg">
                Marketplace roadmap
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="text-lg">
                Whitepaper
              </a>
            </li>
          </ul>
          {/* For mobile and tablet */}
          <div className="lg:hidden flex items-center">
            <button
              className="bg-gradient-to-r from-[#DA458F] to-[#DA34DD] hover:from-[#DA458F] hover:to-[#DA34DD] text-white font-bold py-1 px-3 rounded mr-4 z-20"
              onClick={toggleBurger}
            >
              <FontAwesomeIcon icon={faCaretDown} className={`transition-transform duration-300 ${dropdownShown ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div
              className={`fixed top-0 left-0 h-full w-full z-10 bg-[#17161A]/75 ${
                burgerShown ? 'opacity-100 pointer-events-auto translate-y-2' : 'opacity-0 pointer-events-none -translate-y-8'
              }`}
            >
              <ul className="flex flex-col justify-center items-center h-full">
                <li className="mr-6">
                  <a href="#" className="text-lg">
                    Home
                  </a>
                </li>
                <li className="mr-6">
                  <a href="#" className="text-lg">
                    About us
                  </a>
                </li>
                <li className="mr-6">
                  <a href="#" className="text-lg">
                    Our teams
                  </a>
                </li>
                <li className="mr-6">
                  <a href="#" className="text-lg">
                    Marketplace roadmap
                  </a>
                </li>
                <li className="mr-6">
                  <a href="#" className="text-lg">
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-gradient-to-r from-[#DA458F] to-[#DA34DD] hover:from-[#DA458F] hover:to-[#DA34DD] text-white font-bold py-2 px-4 rounded mr-4">
              Connect wallet
            </button>
            <div className="relative" ref={dropdownRef}>
              <button className="flex items-center gap-2" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faGlobe} />
                <FontAwesomeIcon icon={faAngleDown} className={`transition-transform duration-300 ${dropdownShown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              <div
                className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ${
                  dropdownShown ? 'opacity-100 pointer-events-auto translate-y-2' : 'opacity-0 pointer-events-none translate-y-0'
                } ${dropdownShown ? 'block' : ''} transition-all duration-300`}
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  English
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  French
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  German
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Italian
                </a>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
