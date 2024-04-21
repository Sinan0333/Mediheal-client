import { useEffect,useState } from "react"
import { PatientData } from "../../types/userTypes"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { getUserPatientsApi } from "../../api/user/Patient"
import PatientCard from "./PatientCard"
function LIstUserPatients() {
    const [list,setList] = useState<PatientData[] >()
    const userId = useSelector((state:RootState)=>state.user._id)

    useEffect(()=>{
        getUserPatientsApi(userId).then((res)=>{
            setList(res.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])
  
  
    return (
     <>
     <div className="flex justify-center">
        <div className="ml-20 mr-20 flex flex-wrap overflow-x-auto justify-evenly">
                
          {
            list?.map((pat)=>{ 
              return(
                <PatientCard _id={pat._id} firstName={pat.firstName} secondName={pat.secondName} image={pat.image} dob={pat.dob} age={pat.age} gender={pat.gender} />
              )
            })
          }
        </div>
     </div>
     </>
    )
}

export default LIstUserPatients
