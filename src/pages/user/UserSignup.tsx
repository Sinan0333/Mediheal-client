import Auth from "../../components/common/Auth"


function UserSignup() {
    const changePage ='Already have an account? '
    console.log("changePage", import.meta.env.VITE_BASE_URL);
    
  return (
    <div className="relative">
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/src/assets/images/expressive-young-woman-posing-studio.jpg")' }}>
        <Auth pageName="Signup" changePage={changePage} role="user"  signupInputs="block"/>
      </div>
    </div>
  )
}

export default UserSignup