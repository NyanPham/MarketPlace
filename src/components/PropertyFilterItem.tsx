
type PropertyFilterItemProps = {
    title: string
    children: React.ReactNode
}

const PropertyFilterItem = ({ title, children }: PropertyFilterItemProps) => {
  return (
    <div className="flex flex-col justify-start items-start">
        <h3 className="text-lg font-semibold text-white uppercase">{title}</h3>
        {children}
    </div>
  )
}

export default PropertyFilterItem