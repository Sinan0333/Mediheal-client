export const days:string[] = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

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
    state:File | undefined | string
    setState:(state:any)=>void
    name:string
}



export type ResponseData ={
    data:any
    status:boolean
    message:string
}

export type ListProps = {
    pageName:string
    btnName:string
    th:string[]
}

export type ActionProps={
    viewNav:string
    editNav:string
}

export type LabelProps={
    labelName:string
    value:string | number | undefined 
}

export type AdminHeaderNavigation={
    navigation:string
    _id?:string
}