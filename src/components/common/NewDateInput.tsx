type NewDateInputProps ={
    name:string
    setState:(state:any)=>void
    state:any
}
function NewDateInput({name,state,setState}:NewDateInputProps) {

    const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="mb-6 flex w-1/2 pr-4">
        <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">{name}</label>
        <input className=" flex-grow h-8 py-2 px-4 bg-transparent border-transparent focus:outline-none" min={currentDate} name={name} type="date"  value={state} placeholder={`Enter your ${name}`} onChange={(e)=> setState(e.target.value)}/>
    </div>
  )
}

export default NewDateInput
