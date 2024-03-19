

export type AuthProps = {
    pageName:'Signup' | 'Login'
    role:"user" | "admin" | "doctor"
    signupInputs:"hidden" | "block"
    changePage:String
}

export type AuthValidationProps = {
    name?:string
    phone?:string
    email:string 
    password:string
}

export type RoundedImageInputProps={
    state:File | undefined 
    setState:(state:any)=>void
    name:string
}

export const days:string[] = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

export type ResponseData ={
    data:any
    status:boolean
    message:string
}