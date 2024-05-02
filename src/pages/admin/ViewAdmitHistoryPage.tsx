import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewAdmitHistory from "../../components/admin/ViewAdmitHistory"

function ViewAdmitHistoryPage() {
    return (
        <>
        <Header navigation='/profile'/>
          <div className="flex mt-6 bg-transparent">
            <Navigation/>
            <ViewAdmitHistory/>
          </div>
        </>
      )
}

export default ViewAdmitHistoryPage
