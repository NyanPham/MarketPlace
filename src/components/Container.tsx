type ContainerProps = { children: React.ReactNode }

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto max-w-[1620px] px-4 sm:px-6 lg:px-8">
      {/* <div className="px-4 py-6 sm:p-6 lg:p-8"></div> */}
      {children}
    </div>
  )
}

export default Container
