<<<<<<< HEAD
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
=======
import React from "react";
import { Link } from "react-router-dom";
import { LOGIN_URL } from "../../constantes/urls";
import { useForm } from "react-hook-form";

export function RegisterDoctorPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <body class="antialiased">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="w-[1034px] flex absolute items-start shrink-0 border-transparent h-[650px] left-[160px] top-[140px]"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5">
            {/* flex flex-col space-y-5 */}

            {/* Campo Nombre */}
            <label for="nombre" class="block cursor-pointer">
              <p class="font-medium text-slate-700 pb-1 text-black">Nombres:</p>
              <input
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                class="w-[450px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("nombre", {
                  required: true,
                  minLength: 4,
                })}
              />
              {errors.nombre?.type === "required" && (
                <p>El campo es requerido</p>
              )}
              {errors.nombre?.type === "minLength" && (
                <p>El nombre debe tener mínimo 4 caracteres</p>
              )}
            </label>

            {/* Campo Correo */}
            <label for="correo">
              <p class="font-medium text-slate-700 pb-1 text-black">Correo:</p>
              <input
                id="correo"
                name="correo"
                placeholder="Correo"
                type="email"
                class="w-[380px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("correo", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.correo?.type === "pattern" && (
                <p>El formato del correo es inválido</p>
              )}
            </label>

            {/* Campo Apellido */}
            <label for="apellido">
              <p class="font-medium text-slate-700 pb-1 text-black">
                Apellidos:
              </p>
              <input
                id="apellido"
                name="apellido"
                placeholder="Apellido"
                class="w-[450px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                {...register("apellido", {
                  required: true,
                })}
              />
              {errors.apellido?.type === "required" && (
                <p>El campo es requerido</p>
              )}
            </label>

            {/* Campo Confirmar Correo */}
            <label for="confirCorreo">
              <p class="font-medium text-slate-700 pb-1 text-black">
                Confirmar correo:
              </p>
              <input
                id="confirCorreo"
                name="confirCorreo"
                placeholder="Confirmar correo"
                type="email"
                class="w-[380px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("confirCorreo", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.correo?.type === "pattern" && (
                <p>El formato del correo es inválido</p>
              )}
            </label>

            {/* Campo Teléfono */}
            <label for="numTelefono">
              <p class="font-medium text-slate-700 pb-1 text-black">
                Número de teléfono:
              </p>
              <input
                id="numTelefono"
                name="numTelefono"
                placeholder="Número de teléfono"
                class="w-[450px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="tel"
                {...register("numTelefono", {
                  required: true,
                })}
              />
            </label>

            {/* Campo Contraseña*/}
            <label for="clave">
              <p class="font-medium text-slate-700 pb-1 text-black">
                Crea una contraseña:
              </p>
              <input
                id="clave"
                name="clave"
                placeholder="Crea una contraseña"
                type="password"
                class="w-[380px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("clave", {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors.clave?.type === "minLength" && (
                <p>La contraseña debe tener mínimo 8 caracteres</p>
              )}
            </label>

            {/* Campo Nacionalidad */}
            <label for="nacionalidad">
              <p class="font-medium text-slate-700 pb-1 text-black">
                Nacionalidad:
              </p>

              <select
                class="w-[450px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("nacionalidad", {
                  required: true,
                })}
              >
                <option disabled selected>
                  Selecciona nacionalidad
                </option>
                <option value="ven">Venezuela</option>
                <option value="es">España</option>
                <option value="it">Italia</option>
              </select>
            </label>

            {/* Campo Fecha nacimiento */}
            <label for="fechaNac">
              <p class="font-medium text-slate-700 pb-1 text-black">
                Fecha de nacimiento:
              </p>
              <div>
                <input
                  id="fechaNac"
                  name="fechaNac"
                  class="w-[380px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  type="date"
                  {...register("fechaNac", {
                    required: true,
                  })}
                />
              </div>

              {/* OTRA FORMA SEGÚN FIGMA */}
              {/* <div>
                <p
                id="dia"
                name="fechaNac">Día</p>
                <input
                type="text" 
                placeholder="DD"
                class="w-[80px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("fechaNac", {
                  required: true,
                  min: 1, max: 31
                })}
                />
                {errors.fechaNac?.type === "min" || errors.fechaNac?.type === "max" && (
                  <p>El campo es requerido</p>
                )}
                </div>

                <div>
                <p>Mes</p>
            
                <select
                class="w-[200px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("mes", {
                  required: true,
                })}
                >
                  <option disabled selected>Mes</option>
                  <option value="Ene">Enero</option>
                  <option value="Feb">Febrero</option>
                  <option value="Mar">Marzo</option>
                  <option value="Abr">Abril</option>
                  <option value="May">Mayo</option>
                  <option value="Jun">Junio</option>
                  <option value="Jul">Julio</option>
                  <option value="Ago">Agosto</option>
                  <option value="Sept">Septiembre</option>
                  <option value="Oct">Octubre</option>
                  <option value="Nov">Noviembre</option>
                  <option value="Dic">Diciembre</option>
                </select>
                </div>
                <div>
                <p>Año</p>
                <input
                type="text" 
                placeholder="AAAA"
                class="w-[80px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"/>
                </div>
              </div> */}
            </label>

            {/* Campo País de estudios */}
            <label for="paisEstudio">
              <p class="font-medium text-slate-700 pb-1 text-black">
                País de estudios:
              </p>
              <select
                class="w-[450px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                {...register("paisEstudio", {
                  required: true,
                })}
              >
                <option disabled selected>
                  Selecciona país de estudios
                </option>
                <option value="ven">Venezuela</option>
                <option value="es">España</option>
                <option value="it">Italia</option>
              </select>
            </label>

            {/* Campo Género */}

            <div class=" space-x-2">
              <p class="font-medium text-slate-700 pb-1 text-black">Género:</p>
              <input id="masculino" name="gen" type="radio" />
              <label for="masculino">Hombre</label>

              <input id="femenino" name="gen" type="radio" />
              <label for="femenino">Mujer</label>

              <input id="noBinario" name="gen" type="radio" />
              <label for="noBinario">No Binario</label>

              <input id="otro" name="gen" type="radio" />
              <label for="otro">Otro</label>

              <input id="sinEspecificar" name="gen" type="radio" />
              <label for="sinEspecificar">Prefiero no aclararlo</label>
            </div>

            {/* Campo Experiencia */}
            <label>
              <p class="font-medium text-slate-700 pb-1 text-black">
                Años de experiencia:
              </p>
              <input
                id="experiencia"
                name="experiencia"
                placeholder="Tiempo de experiencia [números]"
                class="w-[400px] py-3 border border-slate-200 rounded-md px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                {...register("experiencia", {
                  required: true,
                })}
              />
            </label>

            <div class="space-y-4">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to={LOGIN_URL}
                  class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>
                    <u>Inicia sesión</u>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </Link>
              </p>
              <p></p>
              <button class="w-[260px] h-[40px] flex py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-3xl border-indigo-500 hover:shadow  items-center justify-center">
                Crear cuenta
              </button>
            </div>
          </div>
        </form>
      </div>
    </body>
  );
>>>>>>> 2882c9c930c1eadf20ba3067a9bad28219a8951c
}
