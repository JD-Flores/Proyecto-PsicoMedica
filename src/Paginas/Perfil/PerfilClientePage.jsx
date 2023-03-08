import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext';
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'
import { Link } from 'react-router-dom';

export function PerfilClientePage() {

  const{user}=useUser();

  const [editable, setEditable] = useState(true);

  return (
    <div id='container' className=' flex justify-center w-screen h-full flex-col'>
      <div id='firstHalf' className=' flex p-4 w-full h-1/5 items-center'>
        <div className='flex flex-col w-full  bg-white p-2 rounded-xl shadow shadow-slate-300 h-full'> 
          <div id='top' className='flex items-center justify-center h-full'>
            <h1 className='flex items-center justify-center text-center text-xl h-2/4'>Bienvenido {user.name}</h1>
          </div>
          <div id='bottom' className='flex flex-row items-center justify-evenly h-2/4'>
            <Link className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Perfil</Link>
            <Link className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Buscar Doctor</Link>
            <Link className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Reservar Cita</Link>
            <Link className='flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-1/5 text-center'>Chats</Link>
          </div>
        </div>
      </div>
      <div id='secondHalf' className='p-4 flex w-full h-4/5 items-center'>
        <div className='flex flex-col w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 h-full'>
          <div id='title' className='text-2xl m-4 mx-0 text-gray-500'>
            <h1>Datos Personales</h1>
          </div>
          <div id='clientData' className='flex flex-col'>
            <div id='top' className='flex flex-row'>
            <div id='leftSide' className='w-2/4'>
                <label htmlFor="name">
                    <p className="font-medium text-slate-700 pb-2">Nombre</p>
                    <input 
                    id="name" name="name" type="text" readOnly={editable}
                    // onChange=""
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.name}/>
                </label>
                <label htmlFor="number">
                    <p className="font-medium text-slate-700 pb-2">Número telefónico</p>
                    <input 
                    id="number" name="number" type="text" readOnly={editable}
                    // onChange=""
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.phone}/>
                </label>
                <label htmlFor="age">
                    <p className="font-medium text-slate-700 pb-2">Edad</p>
                    <input 
                    id="age" name="age" type="age" readOnly={editable}
                    // onChange=""
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.age}/>
                </label>
            </div>
            <div id='rightSide' className='flex justify-center w-2/4'>
                <img src={fotoPerfil} alt="Profile picture" className='w-full rounded-full' />
            </div>
            </div>
            <div id='bottom' className='flex flex-col'>
              <div id='bottomtop'>
                 <label htmlFor="email">
                    <p className="font-medium text-slate-700 pb-2">Direccion de correo </p>
                    <input 
                    id="email" name="email" type="email" readOnly={editable}
                    // onChange=""
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.email}/>
                </label>
                <div id='buttons' className='flex flex-row items-center justify-evenly w-full'>
                  <button onClick={() => setEditable(false)} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-2/5 mt-2' >
                    Editar Datos Personales
                  </button>
                  <button className='flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-2/5 mt-2'>
                    Editar Foto de Perfil
                  </button>
                  </div>
                  { editable==false &&(
                    <div className='flex items-center justify-center'>
                    <button onClick={() => setEditable("readonly")} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-2/5 mt-2' >
                    Actualizar
                  </button>
                  </div>
                  )}
            </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  )
}
