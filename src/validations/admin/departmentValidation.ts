import { DepartmentValidation } from "../../types/adminTypes";
const textPattern : RegExp = /^[a-zA-Z ]+$/

export function departmentValidation({name,title,description,logoFile,imageFile}:DepartmentValidation):string{
  if(!name){
    return "Name is required"
  }else if(name.length < 3){
    return "Name must contain 3 character"
  }else if(!textPattern.test(name)){
    return "Please provide a valid name"
  }else if(!title){
    return "Title is required"
  }else if(title.length < 3){
    return "title must contain 3 character"
  }else if(!textPattern.test(title)){
    return "Please provide a valid title"
  }else if(!description){
    return "description is required"
  }else if(description.length < 3){
    return "description must contain 3 character"
  }else if(!textPattern.test(description)){
    return "Please provide a valid description"
  }else if(!logoFile){
    return "logo is required"
  }else if(!imageFile){
    return "image is required"
  }else{
    return "Success"
  }
}