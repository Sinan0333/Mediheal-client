export type DepartmentValidation = {
    name:string | undefined
    title:string | undefined
    description:string | undefined
    logoFile:File | undefined
    imageFile:File | undefined
}

export type DepartmentApiType = {
    _id?:string
    name:string
    title:string
    description:string
    logo:string
    image:string
}

