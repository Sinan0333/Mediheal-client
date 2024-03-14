import Auth from "../../components/common/Auth"


function UserSignup() {
    const changePage ='Already have an account? '
  return (
    <div className="relative">
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("src/assets/images/expressive-young-woman-posing-studio.jpg")' }}>
        <Auth pageName="Signup" changePage={changePage} checkBox="hidden" signupInputs="block"/>
      </div>
    </div>
  )
}

export default UserSignup