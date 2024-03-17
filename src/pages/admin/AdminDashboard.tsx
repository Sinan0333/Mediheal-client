import Header from "../../components/admin/Header"
import ContentContainer from "../../components/common/ContentContainer"
import Navigation from "../../components/common/Navigation"

function AdminDashboard() {
  return (
    <>
      <Header/>
        <div className="flex mt-6 bg-transparent">
          <Navigation/>
          <ContentContainer/>
        </div>
    </>
  )
}

export default AdminDashboard
