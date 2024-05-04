type DashboardCardProps = {
    image: string
    title: string
    value: number
}
function DashboardCard({image,title,value}:DashboardCardProps) {
  return (
    <div className="neumorphic-navBtn flex justify-between items-center px-4">
        <div className="neumorphic-clicked  w-12 h-12 p-3 ">
            <img className="w-full h-full " src={image} alt="" />
        </div>
        <div className="flex flex-col items-center justify-evenly p-1">
            <h1 className="text-adminBlue text-xl font-bold ">{title}</h1>
            <h1 className="text-adminGreen text-2xl font-bold">{value}</h1>
        </div>
    </div>
  )
}

export default DashboardCard
