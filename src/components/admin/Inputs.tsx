

type InputsProps ={
    name:string
    type:'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'tel' | 'url' | 'file'
}

function Inputs({name,type}:InputsProps) {
  return (
      <div className="mb-6 flex w-1/2 pr-4">
        <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">{name}</label>
        <input className=" flex-grow h-8 py-2 px-4 focus:outline-none" type={type} placeholder={`Enter your ${name}`} />
      </div>
  );
}

export default Inputs;
