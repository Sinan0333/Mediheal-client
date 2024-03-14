import Auth from "../../components/common/Auth"

function UserLogin() {
    const changePage ='New to Mediheal? '
  return (
    <div className="relative">
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("src/assets/images/expressive-young-woman-posing-studio.jpg")' }}>
        <Auth pageName="Login" changePage={changePage} checkBox="hidden" signupInputs="hidden"/>
      </div>
    </div>
  )
}

export default UserLogin