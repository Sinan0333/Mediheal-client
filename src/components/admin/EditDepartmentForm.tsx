import { useEffect, useState } from "react"
import Inputs from "./Inputs"
import RoundedImageInput from "../common/RoundedImageInput"
import { departmentValidation } from "../../validations/admin/departmentValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { base64 } from "../../constants/convert"
import { getDepartmentDataById, updateDepartment } from "../../api/admin/departmentManagementApi"
import { ResponseData } from "../../types/commonTypes"
import { useNavigate, useParams } from "react-router-dom"
import TextArea from "../common/TextArea"

function EditDepartmentForm() {
  const [name ,setName] = useState<string>("")
  const [title,setTitle] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [logoFile,setLogoFile] = useState<string | File>("")
  const [imageFile,setImageFile] = useState<string | File>("")
  const [departmentId,setDepartmentId] = useState<string>("")
  const navigate = useNavigate()
  const {_id}=useParams()

  useEffect(()=>{
    getDepartmentDataById(_id).then((res)=>{
        setName(res.data.name)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setLogoFile(res.data.logo)
        setImageFile(res.data.image)
        setDepartmentId(res.data._id)
    }).catch((err)=>{
        console.error(err);
    })
  },[])

  async function handleSubmit() {

    const validation: string = departmentValidation({ name, title, description, logoFile, imageFile });
    if (validation !== "Success") return notifyError(validation);

    try {

        let logo :string | undefined ;
        if(typeof(logoFile) ==='string'){
          logo = logoFile
        }else{
          logo = await base64(logoFile)
        }

        let image :string | undefined ;
        if(typeof(imageFile) ==='string'){
          image = imageFile
        }else{
          image = await base64(imageFile)
        }

        if(!image || !logo) return notifyError("Couldn't convert the image")
        
        const response:ResponseData =await updateDepartment(departmentId,{name,title,description,logo,image})
        if(!response.status) return notifyError(response.message)
        notifySuccess(response.message)
        navigate('/admin/departments')

    } catch (error) {
      console.error(error);
      notifyError("Error occurred while converting images.");
    }
  }
  
  return (
    <div className="neumorphic py-2 px-2 w-screen min-h-screen pl-4 pt-4 lg:ml-64">
      <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Edit Department</h1>
      <div className="mb-6 ">
       <Inputs name="Name" type="text" setState={setName} state={name}/>
       <TextArea name="Title"  setState={setTitle} height="10" state={title}/>
       <TextArea name="Description"  setState={setDescription} height="32" state={description}/>
       <RoundedImageInput state={logoFile} setState={setLogoFile} name="logo"/>
       <RoundedImageInput state={imageFile} setState={setImageFile} name="image"/>
      </div>
      <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default EditDepartmentForm
