type TextAreaProps ={
    name:string
    setState:(state:any)=>void
    state:any
    height:string
}

function TextArea({name,setState,state,height}:TextAreaProps) {
  return (
    <div className="mb-6 flex w-full  pr-4">
        <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">{name}</label>
        <textarea className={`flex-grow py-2 h-${height} px-4 bg-transparent border-transparent focus:outline-none`} name={name}  value={state} placeholder={`Enter your ${name}`} onChange={(e)=> setState(e.target.value)}/>
    </div>
  )
}

export default TextArea
