import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCaretDown, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useToggle } from '../hooks/useToggle'
import Container from './Container'
import { Link, NavLink } from 'react-router-dom'
import logo from '/assets/logo.png'

const Header = () => {
  const [dropdownShown, toggleDropdown, setDropdown] = useToggle(false)
  const [burgerShown, toggleBurger, setBurger] = useToggle(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const lastScrollY = useRef(0)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdown(false)
    }
  }

  const handleScroll = () => {
    if (window.scrollY > lastScrollY.current) {
      setIsHeaderVisible(false)
    } else {
      setIsHeaderVisible(true)
    }
    lastScrollY.current = window.scrollY
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
    
  return (
    <header className={`bg-[#17161A]/50 fixed top-0 left-0 w-full z-10 font-drone select-none transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <Container>
        <nav className="flex items-center justify-between text-white font-semibold uppercase font-drone text-sm px-6 py-2 lg:px-12 lg:py-6">
          <ul className="hidden lg:flex items-center justify-around">
            <li className="mr-6 md:mr-10 lg:mr-12 shrink-0">
              <Link to="/">
                <img src={logo} alt="Logo" className="w-[84px] h-[36px]" />
              </Link>
            </li>
            <li className="mr-6 md:mr-10 lg:mr-12">
              <NavLink to="/" className={({ isActive }) => `text-lg styled-nav-link ${isActive ? 'is-active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li className="mr-6 md:mr-10 lg:mr-12">
              <NavLink to="/about" className={({ isActive }) => `text-lg styled-nav-link ${isActive ? 'is-active' : ''}`}>
                About us
              </NavLink>
            </li>
            <li className="mr-6 md:mr-10 lg:mr-12">
              <NavLink to="/teams" className={({ isActive }) => `text-lg styled-nav-link ${isActive ? 'is-active' : ''}`}>
                Our teams
              </NavLink>
            </li>
            <li className="mr-6 md:mr-10 lg:mr-12">
              <NavLink to="/roadmap" className={({ isActive }) => `text-lg styled-nav-link ${isActive ? 'is-active' : ''}`}>
                Marketplace roadmap
              </NavLink>
            </li>
            <li className="mr-6 md:mr-10 lg:mr-12">
              <NavLink to="/whitepaper" className={({ isActive }) => `text-lg styled-nav-link ${isActive ? 'is-active' : ''}`}>
                Whitepaper
              </NavLink>
            </li>
          </ul>
          {/* For mobile and tablet */}
          <div className="lg:hidden flex items-center">
            <button
              className="bg-gradient-to-r from-[#DA458F] to-[#DA34DD] hover:from-[#DA458F] hover:to-[#DA34DD] text-white font-bold py-1 px-3 rounded mr-4 z-20"
              onClick={toggleBurger}
            >
              <FontAwesomeIcon icon={faCaretDown} className={`transition-transform duration-300 ${burgerShown ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div
              className={`fixed top-0 left-0 h-screen w-screen z-10 bg-[#17161A]/75 transition-all duration-300 ${
                burgerShown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ul className="flex flex-col justify-center items-center h-full">
                <li className="mr-6">
                  <NavLink to="/" className={({ isActive }) => `text-lg styled-nav-link mobile ${isActive ? 'is-active' : ''}`} onClick={() => setBurger(false)}>
                    Home
                  </NavLink>
                </li>
                <li className="mr-6">
                  <NavLink to="/about" className={({ isActive }) => `text-lg styled-nav-link mobile ${isActive ? 'is-active' : ''}`} onClick={() => setBurger(false)}>
                    About us
                  </NavLink>
                </li>
                <li className="mr-6">
                  <NavLink to="/teams" className={({ isActive }) => `text-lg styled-nav-link mobile ${isActive ? 'is-active' : ''}`} onClick={() => setBurger(false)}>
                    Our teams
                  </NavLink>
                </li>
                <li className="mr-6">
                  <NavLink to="/roadmap" className={({ isActive }) => `text-lg styled-nav-link mobile ${isActive ? 'is-active' : ''}`} onClick={() => setBurger(false)}>
                    Marketplace roadmap
                  </NavLink>
                </li>
                <li className="mr-6">
                  <NavLink to="/whitepaper" className={({ isActive }) => `text-lg styled-nav-link mobile ${isActive ? 'is-active' : ''}`} onClick={() => setBurger(false)}>
                    Whitepaper
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-[#DA458F] to-[#DA34DD] hover:from-[#DA458F] hover:to-[#DA34DD] text-white font-bold py-2 px-4 rounded mr-4">
              Connect wallet
            </button>
            <div className="relative" ref={dropdownRef}>
              <button className="flex items-center gap-2" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faGlobe} />
                <FontAwesomeIcon icon={faAngleDown} className={`transition-transform duration-300 ${dropdownShown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              <div
                className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg transition-all duration-300 ${
                  dropdownShown ? 'opacity-100 pointer-events-auto translate-y-2' : 'opacity-0 pointer-events-none translate-y-0'
                }`}
              >
                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdown(false)}>
                  English
                </Link>
                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdown(false)}>
                  Vietnamese
                </Link>
                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdown(false)}>
                  Japanese
                </Link>
                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdown(false)}>
                  Chinese
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
