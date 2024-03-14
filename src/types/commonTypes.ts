export type AuthProps = {
    pageName:'Signup' | 'Login'
    signupInputs:"hidden" | "block"
    checkBox:"hidden" | "block"
    changePage:String
}

export type authValidationProps = {
    name?:string
    phone?:string
    email:string 
    password:string
}
