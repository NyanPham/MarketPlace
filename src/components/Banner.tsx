import cates from '../../public/assets/cates.png'
import arrivalTxt from '../../public/assets/arrival-text.png'
import newTag from '../../public/assets/new-tag.png'
import djText from '../../public/assets/dj-text.png'
import djChar from '../../public/assets/dj-character.png'
import useOnScreen from '../hooks/useOnScreen'
import { useRef } from 'react'
import Container from './Container'

const Banner = () => {
  const inViewRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useOnScreen(inViewRef);

  const animation = {
    transition: 'all 1.5s ease',
    opacity: isVisible ? 1 : 0,
  }

  const categoriesAnimation = {
    ...animation,
    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
  }

  const newTagAnimation = {
    ...animation,
    transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
    animation: 'animate-shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
  }

  const arrivalTxtAnimation = {
    ...animation,
    transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
  }

  const djCharAnimation = {
    ...animation,
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
  }

  const djTxtAnimation = {
    ...animation,
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
  }

  return (
    <div ref={inViewRef} className="bg-no-repeat bg-center w-full h-screen overflow-hidden" style={{ backgroundImage: `url('../../public/assets/background.png')` }}>
    <Container>
        <div className="absolute inset-0 bg-black opacity-70 z-0" />
        <img src={cates} alt="Categories" style={categoriesAnimation} className="absolute bottom-0 left-0 w-full" />
        <img src={newTag} alt="New tag" style={newTagAnimation} className={`${isVisible ? 'animate-shake': ''} absolute top-[25%] left-[10vw]  w-[25%]`} />
        <img src={arrivalTxt} alt="arrival text" style={arrivalTxtAnimation} className="absolute top-[29%] left-[35vw] w-[29%]" />
        <img src={djChar} alt="DJ person" style={djCharAnimation} className="absolute bottom-0 right-20 w-[23%]" />
        <img src={djText} alt="DJ banner" style={djTxtAnimation} className="absolute bottom-0 -translate-y-4 right-10 w-[30%]" />
    </Container>
      </div>
  )
}

export default Banner
