type AuthProps = {
pageName:'Signup' | 'Login'
signupInputs:"hidden" | "block"
checkBox:"hidden" | "block"
changePage:String
}

function Auth({pageName,signupInputs,checkBox,changePage}:AuthProps) {
  return (
    <div className="neumorphic-auth absolute  top-8 sm:top-16 left-4 sm:left-11 mx-auto sm:mx-0 p-11 items-center flex flex-col" style={{ maxWidth: '500px' }}>
          <p className='text-4xl mb-6 font-bold'>{pageName}</p>
          <input className={`neumorphic-input-auth mb-4 m-2 outline-none ${signupInputs}`} placeholder="Name" type="text" />
          <input className={`neumorphic-input-auth mb-4 m-2 outline-none ${signupInputs}`} placeholder="Phone" type="text" />
          <input className={`neumorphic-input-auth mb-4 m-2 outline-none`} placeholder="Email" type="password" />
          <input className={`neumorphic-input-auth mb-4 m-2 outline-none`} placeholder="Password" type="text" />
          {pageName === 'Login' ? <p className='text-blue-600 cursor-pointer'>Forgot Password</p> :""}
          <div className= {`${checkBox}`}>
            <label className="inline-flex items-center">
                <input type="radio" className="form-radio text-blue-500" name="radio" defaultChecked/>
                <span className="ml-2">Admin</span>
            </label>
            <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio text-blue-500" name="radio" />
                <span className="ml-2">Doctor</span>
            </label>
           </div>
         <div className='neumorphic-auth mt-4 cursor-pointer  top-8 sm:top-16 left-4 sm:left-11 mx-auto sm:mx-0 p-4 items-center flex flex-col hover:bg-blue-500 hover:text-white'style={{maxWidth:'500px',width:'450px'}}>
          <p className='text-xl font-bold'>{pageName}</p>
         </div>
         <br />
         or
         <div className='flex items-center justify-center cursor-pointer'>
          <img style={{width:'40px', paddingTop:'5px'}} src="src/assets/icons/icons8-google-48.png" alt="Google" />
          <p className='pl-5 font-bold '>Signup  with Google</p>
         </div>
         <br /> 
         <p className='float-left'>{changePage}<span className='text-blue-700 cursor-pointer'>{pageName === 'Signup' ? 'login' : 'signup'}</span></p>
        </div>
  )
}

export default Auth