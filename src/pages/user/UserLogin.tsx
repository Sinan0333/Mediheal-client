import Auth from "../../components/common/Auth"

function UserLogin() {
    const changePage ='New to Mediheal? '
  return (
    <div className="relative">
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/assets/images/expressive-young-woman-posing-studio.jpg")' }}>
        <Auth pageName="Login" role="user"  changePage={changePage}  signupInputs="hidden" />
      </div>
    </div>
  )
}

export default UserLogin