export type AuthProps = {
    pageName:'Signup' | 'Login'
    role:"user" | "admin" | "doctor"
    signupInputs:"hidden" | "block"
    changePage:String
}

export type authValidationProps = {
    name?:string
    phone?:string
    email:string 
    password:string
}
