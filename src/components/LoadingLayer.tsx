import '../styles/LoaderStyles.css'

const LoadingLayer = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-85 transition-all duration-300 z-10 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
      }`}
    >
      <span className="loader"></span>
    </div>
  )
}

export default LoadingLayer
