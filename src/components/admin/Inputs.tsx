

type InputsProps ={
    name:string
    type:'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'tel' | 'url' | 'file'
    setState:(state:any)=>void
    state:any
}

function Inputs({name,type,setState,state}:InputsProps) {
  
  return (
      <div className="mb-6 flex w-1/2 pr-4">
        <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">{name}</label>
        <input className=" flex-grow h-8 py-2 px-4 bg-transparent border-transparent focus:outline-none" name={name} type={type} value={state} placeholder={`Enter your ${name}`} onChange={(e)=>type ==='number' ? setState(parseInt(e.target.value)) : setState(e.target.value)}/>
      </div>
  );
}

export default Inputs;
