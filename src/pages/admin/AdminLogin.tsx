import Auth from "../../components/common/Auth"


function AdminLogin() {
    const changePage =''
    return (
      <div className="relative">
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("src/assets/images/expressive-young-woman-posing-studio.jpg")' }}>
          <Auth pageName="Login" changePage={changePage} checkBox="block" signupInputs="hidden"/>
        </div>
      </div>
    )
}

export default AdminLogin
