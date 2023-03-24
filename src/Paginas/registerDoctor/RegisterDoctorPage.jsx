import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Nacionalidad } from '../../Componentes/ListasInputs/Nacionalidad';
import { completed, registerWithEmailAndPassword, returnError, signInWithGoogle } from '../../firebase/auth-service';
import { Link } from 'react-router-dom';
import { LOGIN_URL, PERFIL_DOCTOR, REGISTER_DOCTOR_URL } from '../../constantes/urls';
import { Telefono } from '../../Componentes/ListasInputs/Telefono';
import { store } from '../../firebase/config';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { uploadFile } from '../../firebase/users-service';
import { async } from '@firebase/util';

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
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [formData,setFormData] =useState({
      doctor:true,  
      name:"",
      lastname:"",
      email:"",
      phone:"",
      password:"",
      confirmPassword:"",
      country:"",
      age:"",
      gender:"",
      profilePic:"",
      specialty:"",
      grade:"",
      Experience:"",
      Price:0,
      ranking:0,
      biography:""


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
        
        const result = await uploadFile(file);
        formData.profilePic=result;
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
      }
      else{
        setFormData({
          ...formData,
          [name]:value,
      })
      }
  }



  

  

  return (
    <div className='flex justify-center items-center m-3 py-9'>
    <div className='flex justify-center items-center flex-col  max-w-lg m-2 bg-white p-5 rounded-xl shadow shadow-slate-300 h-full text-xs '>
      <p className=" my-4 p-2 font-bold pb-1 text-black text-lg">Ingresa tus datos para confirmar el registro</p>
      <form action="" onSubmit={onSubmit} className="flex flex-col justify-between gap-2">
        <div className='flex flex-row  gap-x-16 gap-y-5'>
        <div id='leftHalf' className='w-full'>
          <label htmlFor="name" className= "block cursor-pointer">
            <div className='flex flex-row py-1 mt-2'>
                <h1 className="font-medium text-slate-700 pb-2 text-sm ">Nombre</h1><p className='text-red-600'>{errorName}</p>
                </div>
                <input 
                id="name" name="name" type="text" 
                onChange={handleOnChange}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu nombre"/>
            </label>

            <label htmlFor="lastname" className= "block cursor-pointer">
            <div className='flex flex-row py-1 mt-2'>
                <h1 className="font-medium text-slate-700 pb-2 text-sm ">Apellido</h1><p className='text-red-600'>{errorName}</p>
                </div>
                <input 
                id="lastname" name="lastname" type="text" 
                onChange={handleOnChange}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu apellido"/>
            </label>

            <label htmlFor="email" className= "block cursor-pointer">
            <div className='flex flex-row py-1 mt-2'>
                <h1 className="font-medium text-slate-700 pb-2 text-sm">Correo electrónico</h1><p className='text-red-600'>{errorEmail}</p>
                </div>                   
                 <input 
                    id="email" name="email" type="email" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu correo"/>
                </label>
                <div>
                <label htmlFor="telefono">
                    <div className='flex flex-row py-1 mt-2'>
                    <h1 className="font-medium text-slate-700 pb-2 text-sm">Teléfono</h1><p className='text-red-600'>{errorPhone}</p>
                    </div>                   
                     {/* <Telefono></Telefono> */}
                    <input 
                    id="phone" name="phone" type="text" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu número de teléfono"/>
                </label>
                </div>
                <label htmlFor="password">
                    <div className='flex flex-row py-1 mt-2'>
                    <h1 className="font-medium text-slate-700 pb-2 text-sm">Contraseña</h1><p className='text-red-600'>{errorPassword}</p>
                    </div>
                    <input id="password" name="password" type="password" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu contraseña"/>
                </label>
                <label htmlFor="confirmar">
                  <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Confirmar contraseña</h1><p className='text-red-600'>{errorConfirm}</p>
                  </div>
                    <input id="confirmPassword" name="confirmPassword" type="password" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa nuevamente la contraseña"/>
                </label>
                <label htmlFor="Experience">
                  <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Años de experiencias</h1><p className='text-red-600'>{errorConfirm}</p>
                  </div>
                    <input id="Experience" name="Experience" type="text" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingrese sus años de experiencia"/>
                </label>
                <label htmlFor="Price">
                  <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Precio por consulta</h1><p className='text-red-600'>{errorConfirm}</p>
                  </div>
                    <input id="Price" name="Price" type="number" 
                    onChange={handleOnChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Indique un precio"/>
                </label>
          </div>
          <div id='rightHalf' className='w-full'>
          <div>
            <label htmlFor="country">
              <div className='flex flex-row py-1 mt-2'>
              <h1 className="font-medium text-slate-700 pb-2 text-sm">Nacionalidad</h1><p className='text-red-600'>{errorCountry}</p>
              </div> 
              <Nacionalidad handle={handleOnChange} ></Nacionalidad>
            </label>
            </div>
            
            
            <label htmlFor="age">
            <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Fecha de nacimiento</h1><p className='text-red-600'>{errorAge}</p>
                  </div>
                <input id="age" name="age" type="date" 
                onChange={handleOnChange}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="nacionalidad"/>
            
            </label>
            <label htmlFor="gender">
            <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Género</h1><p className='text-red-600'>{errorGender}</p>
                  </div>
                <select id="gender" name="gender" 
                onChange={handleOnChange}
                className=" w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="nacionalidad">
                  <option>Elige tu género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                  </select>
            
            </label>
            <label htmlFor="specialty">
            <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Especialidad</h1><p className='text-red-600'>{errorGender}</p>
                  </div>
                <select id="specialty" name="specialty" 
                onChange={handleOnChange}
                className=" w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="nacionalidad">
                  <option>Indique su Especialidad</option>
                  <option value="Depresión">Depresión</option>
                  <option value="Trastorno bipolar">Trastorno bipolar</option>
                  <option value="Ansiedad">Ansiedad</option>
                  <option value="Trastorno obsesivo-compulsivo">Trastorno obsesivo-compulsivo</option>
                  <option value="Trastorno por estrés postraumático">Trastorno por estrés postraumático</option>
                  <option value="Trastorno por estrés agudo">Trastorno por estrés agudo</option>
                  <option value="Somatización">Somatización</option>
                  <option value="Disfunciones sexuales">Disfunciones sexuales</option>
                  <option value="Abusos sexuales">Abusos sexuales</option>
                  <option value="Dependencia emocional">Dependencia emocional</option>
                  <option value="Insomnio y trastornos del sueño">Insomnio y trastornos del sueño</option>
                  <option value="Trastornos de personalidad">Trastornos de personalidad</option>
                  <option value="Terapia de pareja">Terapia de pareja</option>
                  <option value="Otro">Otro</option>
                  </select>
                  </label>

                  <label htmlFor='grade'>
                  <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Grado</h1><p className='text-red-600'>{errorGender}</p>
                  </div>
                  <select id="grade" name="grade" 
                    onChange={handleOnChange}
                    className=" w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="grado">
                      <option>Indica tu grado</option>
                      <option value="Licenciado">Licenciado</option>
                      <option value="Master">Master</option>
                      <option value="Doctor">Doctor</option>
                  </select>
            
            </label>
            <div className='flex flex-col py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Subir foto de perfil</h1>
                  <img className='rounded-full w-[110px] h-[110px] mb-2' src={image} alt="" />

                  <input type="file" name='profilePic' onChange={(e) => {setFile(e.target.files[0]), setImage(URL.createObjectURL(e.target.files[0]))}}/>
            </div>
            
          </div>
          </div>
          <p className='text-red-700'>{error}</p> 
          <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className='text-sm'>Registrarse</span>
            </button> 
            <p className="text-center text-black p-2 font-medium text-sm">¿Ya tienes una cuenta? <Link to={LOGIN_URL} className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline text-sm"><span>Inicia sesión. </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg></span></Link></p>
        </form>
    </div>
    </div>
  )
}
