import cates from '/assets/banners/cates.png'
import arrivalTxt from '/assets/banners/arrival-text.png'
import newTag from '/assets/banners/new-tag.png'
import djText from '/assets/banners/dj-text.png'
import djChar from '/assets/banners/dj-character.png'
import useOnScreen from '../hooks/useOnScreen'
import { useEffect, useRef } from 'react'
import Container from './Container'
import '../styles/Banner.css'
import { Link } from 'react-router-dom'

const Banner = () => {
  const inViewRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useOnScreen(inViewRef)
  const animationRef = useRef<boolean>(false)

  useEffect(() => {
    if (isVisible === false) return
    animationRef.current = true
  }, [isVisible])

  const animation = {
    transition: 'all 1.5s ease',
    opacity: isVisible || animationRef.current ? 1 : 0,
  }

  const categoriesAnimation = {
    ...animation,
    transform: isVisible || animationRef.current ? 'translateY(0)' : 'translateY(100%)',
  }

  const newTagAnimation = {
    ...animation,
    transform: isVisible || animationRef.current ? 'translateY(0) scale(var(--scale))' : 'translateY(-100%) scale(var(--scale))',
    animation: 'animate-shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
  }

  const arrivalTxtAnimation = {
    ...animation,
    transform: isVisible || animationRef.current ? 'translateY(0) scale(var(--scale))' : 'translateY(-100%) scale(var(--scale))',
  }

  const djCharAnimation = {
    ...animation,
    transform: isVisible || animationRef.current ? 'translateY(0) scale(var(--scale))' : 'translateY(100%) scale(var(--scale))',
  }

  const djTxtAnimation = {  
    ...animation,
    transform: isVisible || animationRef.current ? 'translateY(0) scale(var(--scale))' : 'translateY(100%) scale(var(--scale))',
  } 

  return (
    <div ref={inViewRef} className="bg-no-repeat bg-center bg-cover w-full h-screen overflow-hidden" style={{ backgroundImage: `url('/assets/banners/background.png')` }}>
      <Container>
        <div className="absolute inset-0 bg-black opacity-70 z-0" />
        <img src={cates} alt="Categories" style={categoriesAnimation} className="absolute bottom-0 left-0 w-full" />
        <Link to="#" className="scale-on-hover">
          <img src={newTag} alt="New tag" style={newTagAnimation} className={`absolute top-25 left-10vw w-25`} />
          <img src={arrivalTxt} alt="arrival text" style={arrivalTxtAnimation} className="absolute top-29 left-35vw w-29" />
        </Link>
        <Link to="#" className="scale-on-hover">
          <img src={djChar} alt="DJ person" style={djCharAnimation} className="absolute bottom-0 right-20 w-23" />
          <img src={djText} alt="DJ banner" style={djTxtAnimation} className="absolute bottom-0 -translate-y-4 right-10 w-30" />
        </Link>
      </Container>
    </div>
  )
}

export default Banner
