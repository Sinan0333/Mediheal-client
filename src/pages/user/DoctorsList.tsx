import { useEffect,useState } from "react"
import DoctorCard from "../../components/user/DoctorCard"
import Nav from "../../components/user/Nav"
import { listDoctorsApi } from "../../api/doctor/doctorApi"
import { DoctorData } from "../../types/doctorTypes"



function DoctorsList() {

  
  const [list,setList] = useState<DoctorData[] >()

  useEffect(()=>{
      listDoctorsApi().then((data)=>{
          setList(data.data)
      }).catch((err)=>{
          console.log(err.message);
      })
  },[])


  return (
   <>
   <Nav/>
   <div className="flex justify-center mt-5 mb-6">
        <h1 className="font-bold text-4xl text-adminBlue ">Our Doctors</h1>
   </div>
   <div className="flex justify-center">
    <div className="ml-20 mr-20 flex flex-wrap overflow-x-auto justify-evenly">
            
      {
        list?.map((doc)=>{
          console.log(doc);
          
          return(
            <DoctorCard key={doc._id} firstName={doc.firstName} secondName={doc.secondName} experience={doc.experience}  department={doc.department}  image={doc.image} age={doc.age} gender={doc.gender} fees={doc.fees}/>
          )
        })
      }
    </div>
   </div>
   </>
  )
}

export default DoctorsList
