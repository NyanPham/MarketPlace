
type PropertyFilterItemProps = {
    title: string
    titleClasses?: string
    children: React.ReactNode
}

const PropertyFilterItem = ({ title, children, titleClasses }: PropertyFilterItemProps) => {
  return (
    <div className="flex flex-col justify-start items-start">
        <h3 className={`text-lg font-semibold uppercase ${titleClasses != null ? titleClasses : 'text-white'}`}>{title}</h3>
        {children}
    </div>
  )
}

export default PropertyFilterItem