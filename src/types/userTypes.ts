export type SignupData={
    name:String
    phone:string 
    email:String
    password:String
}


export type LoginType ={
    email:string
    password:string
}


export type UserData = {
    _id:string
    name:string
    phone:number
    email:string
}


export type SignupResponse = {
    userData?:UserData
    token?:string
    otp_id:string
    status:true | false
    message:string
}

