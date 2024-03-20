import { useNavigate } from "react-router-dom"
import Header from "../../components/admin/Header"
import Navigation from "../../components/common/Navigation"


function Sample() {
  const navigate = useNavigate()
  return (
    <>
    <Header/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
          <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Department</h1>
          <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>navigate('/admin/department/add')}>Add</button>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
              <thead>
                <tr >
                <th className="px-4 py-2 text-left w-auto">No</th>
                <th className="px-4 py-2 text-left w-auto">Name</th>
                <th className="px-4 py-2 text-left w-auto">Image</th>
                <th className="px-4 py-2 text-left w-auto">Title</th>
                <th className="px-4 py-2 text-left w-auto">Description</th>
                <th className="px-4 py-2 text-left w-auto">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">Cardiology</td>
                <td className="px-4 py-2">hel</td>
                <td className="px-4 py-2">sample</td>
                <td className="px-4 py-2">sample</td>
                <td className="px-4 py-2">sample</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </>
  )
}

export default Sample
