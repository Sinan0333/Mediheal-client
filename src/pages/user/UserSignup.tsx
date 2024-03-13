import Auth from "../../components/common/Auth"

type UserSignupProps = {
pageName:'Signup' | 'Login'
signupInputs:"hidden" | "block"
checkBox:"hidden" | "block"
}

function UserSignup({pageName,signupInputs,checkBox}:UserSignupProps) {
    const changePage = pageName === "Signup" ? 'Already have an account? ' : 'New to Mediheal? '
  return (
    <div className="relative">
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("src/assets/images/expressive-young-woman-posing-studio.jpg")' }}>
        <Auth pageName="Signup" changePage={changePage} checkBox="hidden" signupInputs="block"/>
      </div>
    </div>
  )
}

export default UserSignup