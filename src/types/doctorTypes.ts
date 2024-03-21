export type AddDoctorValidationType  = {
    firstName:string | undefined
    secondName:string | undefined
    dob:Date | undefined
    age:number | undefined
    gender:string | undefined
    address:string | undefined
    experience:number | undefined
    phone:number | undefined
    email:string | undefined
    department:string | undefined
    workingDays:string[]
    image:File | undefined
}

export type DoctorData = {
    _id?:string
    firstName:string 
    secondName:string 
    dob:Date 
    age:number 
    gender:string 
    address:string 
    experience:number 
    phone:number 
    email:string 
    department:string 
    workingDays:string[]
    image:string 
}
