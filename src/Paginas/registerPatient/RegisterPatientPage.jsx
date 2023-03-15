import { LOGIN_URL, PERFIL_CLIENTE, REGISTER_PATIENT_URL } from '../../constantes/urls'
import { Link, useNavigate } from 'react-router-dom'
import { completed, returnError, signInWithGoogle } from '../../firebase/auth-service'
import { useState } from 'react'
import { registerWithEmailAndPassword } from '../../firebase/auth-service'

export function RegisterPatientPage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
    const [formData,setFormData] =useState({
        doctor:false,
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
    })
  
//const para el login con google
    const handleSigninWithGoogle = async ()=>{
        await signInWithGoogle();
        if(completed()){
            navigate(PERFIL_CLIENTE)
          }else{
            navigate(REGISTER_PATIENT_URL)
          }
        
    }

    const onSubmit = async(event)=>{
        event.preventDefault();//evita que el form recargue la pagina
        if(formData.name==""){
            setError("Los campos marcados con * en rojo son obligatorios")
            setErrorName("*")
          }
          if(formData.email==""){
            setError("Los campos marcados con * en rojo son obligatorios")
            setErrorEmail("*")
                }
          if(formData.phone==""){
            setError("Los campos marcados con * en rojo son obligatorios")
            setErrorPhone("*")
          }
          if(formData.password==""){
            setError("Los campos marcados con * en rojo son obligatorios")
            setErrorPassword("*")
          }
          if(formData.confirmPassword==""){
            setError("Los campos marcados con * en rojo son obligatorios")
            setErrorConfirm("*")
          }else{
            const{email,password,...extraData}=formData//form destructurado
        await registerWithEmailAndPassword(email,password,extraData);
        if(completed()){
            navigate(PERFIL_CLIENTE)
          }else{
            setError(returnError())
          }
          }
        
    }
//en cada input utiliza la info del campo para agregarla al form existente
    const handleOnChange = (event)=>{
        const{name,value}=event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
  
    return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
    
        <h1 className="text-4xl font-medium text-center p-2">Registrar Cuenta</h1>

        <div className="my-5">
            <button onClick={handleSigninWithGoogle} className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> <span>Continuar con Google</span>
            </button>
        </div>

        <form action="" onSubmit={onSubmit}>
            <div className="flex flex-col space-y-5">
            <label htmlFor="name">
            <div className='flex flex-row'>
                <h1 className="font-medium text-slate-700 pb-2">Nombre completo</h1><p className='text-red-600'>{errorName}</p>
                </div>
                    <input 
                    id="name" name="name" type="text" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa tu nombre completo"/>
                </label>
                <label htmlFor="email">
                <div className='flex flex-row'>
                <h1 className="font-medium text-slate-700 pb-2">Correo electrónico</h1><p className='text-red-600'>{errorEmail}</p>
                </div>  
                    <input 
                    id="email" name="email" type="email" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa tu correo electrónico"/>
                </label>
                <label htmlFor="telefono">
                <div className='flex flex-row'>
                    <h1 className="font-medium text-slate-700 pb-2">Número de teléfono</h1><p className='text-red-600'>{errorPhone}</p>
                    </div>
                    <input 
                    id="phone" name="phone" type="text" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa tu número de teléfono"/>
                </label>
                <label htmlFor="password">
                <div className='flex flex-row'>
                    <h1 className="font-medium text-slate-700 pb-2">Contraseña</h1><p className='text-red-600'>{errorPassword}</p>
                    </div>
                    <input id="password" name="password" type="password" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa tu contraseña"/>
                </label>
                <label htmlFor="confirmar">
                <div className='flex flex-row'>
                  <h1 className="font-medium text-slate-700 pb-2">Confirmar contraseña</h1><p className='text-red-600'>{errorConfirm}</p>
                  </div>
                    <input id="confirmPassword" name="confirmPassword" type="password" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa nuevamente la contraseña"/>
                </label>
                
                <p className='text-red-700'>{error}</p> 
                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Registrarse</span>
                </button> 
                 <p className="text-center text-black">¿Ya tienes una cuenta? <Link to={LOGIN_URL} className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline"><span>Inicia sesión. </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg></span></Link></p>
            </div>
        </form>
    </div>
   


  )
}
