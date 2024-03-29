export type DepartmentValidation = {
    name:string | undefined
    title:string | undefined
    description:string | undefined
    logoFile:File | undefined | string
    imageFile:File | undefined | string
}

export type DepartmentApiType = {
    _id?:string
    name:string
    title:string
    description:string
    logo:string
    image:string
}

export type DepartmentDataType = {
    _id:string
    name:string
    title:string
    description:string
    logo:string
    image:string
    is_blocked:boolean
}

