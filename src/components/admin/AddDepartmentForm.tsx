import { useState } from "react"
import Inputs from "./Inputs"
import RoundedImageInput from "../common/RoundedImageInput"
import { departmentValidation } from "../../validations/admin/departmentValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { base64 } from "../../constants/convert"
import { addDepartment } from "../../api/admin/departmentApi"
import { ResponseData } from "../../types/commonTypes"
import { useNavigate } from "react-router-dom"


function AddDepartmentForm() {
  const [name ,setName] = useState<string>("")
  const [title,setTitle] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [logoFile,setLogoFile] = useState<File | string>("")
  const [imageFile,setImageFile] = useState<File | string>("")
  const navigate = useNavigate()

  async function handleSubmit() {

    const validation: string = departmentValidation({ name, title, description, logoFile, imageFile });
    if (validation !== "Success") return notifyError(validation);

    try {

      if(!(logoFile instanceof File) || !(imageFile instanceof File) ) return notifyError("Please Select the image")
      const logo = await base64(logoFile);
      const image = await base64(imageFile);
      if(!logo || !image)return notifyError("Couldn't convert image")

        const response:ResponseData =await addDepartment({name,title,description,logo,image})
        if(!response.status) return notifyError(response.message)
        notifySuccess(response.message)
        navigate('/admin/departments')


    } catch (error) {
      console.error(error);
      notifyError("Error occurred while converting images.");
    }
  }
  

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Add Department</h1>
      <div className="mb-6 ">
       <Inputs name="Name" type="text" setState={setName} state={name}/>
       <Inputs name="Title" type="text" setState={setTitle} state={title}/>
       <Inputs name="Description" type="text" setState={setDescription} state={description}/>
       <RoundedImageInput state={logoFile} setState={setLogoFile} name="logo"/>
       <RoundedImageInput state={imageFile} setState={setImageFile} name="image"/>
      </div>
      <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default AddDepartmentForm
