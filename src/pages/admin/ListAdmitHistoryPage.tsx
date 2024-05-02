import Header from "../../components/admin/Header"
import ListAdmitHistory from "../../components/admin/ListAdmitHistory"
import Navigation from "../../components/admin/Navigation"

function ListAdmitHistoryPage() {
    return (
        <>
        <Header navigation='/profile'/>
          <div className="flex mt-6 bg-transparent">
            <Navigation/>
            <ListAdmitHistory/>
          </div>
        </>
      )
}

export default ListAdmitHistoryPage
