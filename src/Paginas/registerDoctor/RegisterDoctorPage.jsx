import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Nacionalidad } from '../../Componentes/ListasInputs/Nacionalidad';
import { completed, registerWithEmailAndPassword, returnError, signInWithGoogle } from '../../firebase/auth-service';
import { Link } from 'react-router-dom';
import { LOGIN_URL, PERFIL_DOCTOR, REGISTER_DOCTOR_URL } from '../../constantes/urls';
import { Telefono } from '../../Componentes/ListasInputs/Telefono';

export function RegisterDoctorPage() {
  const navigate = useNavigate();
  function calculateAge(date) {
    const now = new Date();
    const diff = Math.abs(now - date );
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
    return age
} 
  const [error, setError] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [errorCountry, setErrorCountry] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const [formData,setFormData] =useState({
      doctor:true,  
      name:"",
      email:"",
      phone:"",
      password:"",
      confirmPassword:"",
      country:"",
      age:"",
      gender:"",
  })


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
      }
      if(formData.country==""){
        setError("Los campos marcados con * en rojo son obligatorios")
        setErrorCountry("*")
      }
      if(formData.age==""){
        setError("Los campos marcados con * en rojo son obligatorios")
        setErrorAge("*")
      }
      if(formData.gender==""){
        setError("Los campos marcados con * en rojo son obligatorios")
        setErrorGender("*")
      }else{
        const{email,password,confirmPassword,...extraData}=formData//form destructurado
      await registerWithEmailAndPassword(email,password,confirmPassword,extraData);
      if(completed()){
        navigate(PERFIL_DOCTOR)
      }else{
        setError(returnError())
      }
      }
      
      
  }
//en cada input utiliza la info del campo para agregarla al form existente
  const handleOnChange = (event)=>{
      const{name,value}=event.target;
      if(name=="age"){
        setFormData({
          ...formData,
          [name]:calculateAge(new Date(value)),
      }
      )
      }else{
        setFormData({
          ...formData,
          [name]:value,
      })
      }
  }

  return (
    <div className='flex justify-center items-center'>
    <div className='flex justify-center items-center flex-col  max-w-lg m-2 bg-white p-4 rounded-xl shadow shadow-slate-300 h-full text-xs '>
      <p className="text-slate-500 my-3 ">Ingrese sus datos para confirmar registro</p>
      <form action="" onSubmit={onSubmit} className="flex flex-col justify-between gap-2">
        <div className='flex flex-row gap-2'>
        <div id='leftHalf' className='w-full'>
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
                <h1 className="font-medium text-slate-700 pb-2">Direccion de correo</h1><p className='text-red-600'>{errorEmail}</p>
                </div>                   
                 <input 
                    id="email" name="email" type="email" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa dirección de correo"/>
                </label>
                <div>
                <label htmlFor="telefono">
                    <div className='flex flex-row'>
                    <h1 className="font-medium text-slate-700 pb-2">Telefono</h1><p className='text-red-600'>{errorPhone}</p>
                    </div>                   
                     {/* <Telefono></Telefono> */}
                    <input 
                    id="phone" name="phone" type="text" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa tu número de telefono"/>
                </label>
                </div>
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
          </div>
          <div id='rightHalf' className='w-full'>
          <div>
            <label htmlFor="country">
              <div className='flex flex-row'>
              <h1 className="font-medium text-slate-700 pb-2">Nacionalidad</h1><p className='text-red-600'>{errorCountry}</p>
              </div> 
              <Nacionalidad handle={handleOnChange} ></Nacionalidad>
            </label>
            </div>
            
            
            <label htmlFor="age">
            <div className='flex flex-row'>
                  <h1 className="font-medium text-slate-700 pb-2">Fechas nacimiento</h1><p className='text-red-600'>{errorAge}</p>
                  </div>
                <input id="age" name="age" type="date" 
                onChange={handleOnChange}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="nacionalidad"/>
            
            </label>
            <label htmlFor="gender">
            <div className='flex flex-row'>
                  <h1 className="font-medium text-slate-700 pb-2">Genero</h1><p className='text-red-600'>{errorGender}</p>
                  </div>
                <select id="gender" name="gender" 
                onChange={handleOnChange}
                className=" bg-white w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="nacionalidad">
                  <option>Elija su Genero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                  </select>
            
            </label>
          </div>
          </div>
          <p className='text-red-700'>{error}</p> 
          <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
            </button> 
            <p className="text-center text-black">Ya tienes una cuenta? <Link to={LOGIN_URL} className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Inicia sesion! </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg></span></Link></p>
        </form>
    </div>
    </div>
  )
}
