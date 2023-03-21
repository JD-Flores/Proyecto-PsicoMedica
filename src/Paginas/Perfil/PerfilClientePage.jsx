import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext';
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'
import { ProfileNav } from '../../Componentes/ProfileNav/ProfileNav';
import { async } from '@firebase/util';
import { getUserInfo } from '../../firebase/users-service';
import { updateProfile } from 'firebase/auth';
import { uploadFile } from '../../firebase/users-service';
import { updateProfilePic } from '../../firebase/users-service';

export function PerfilClientePage() {

  const{user}=useUser();

  const [editable, setEditable] = useState(true);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const updatePhoto = async() =>{
    user.profilePic=null;
    const result = await uploadFile(file);
    console.log(result);
    if (result==null) {
      const url =  "gs://proyecto-psicomedica-6dbc5.appspot.com/fotoPerfil.jpg";
      updateProfilePic(user,url);
      console.log(result);
      
    }
    else{
      
      updateProfilePic(user,result);
      console.log(result);
    }
  }

  return (
    <div id='container' className=' flex justify-center w-screen h-full flex-col'>
      <ProfileNav></ProfileNav>
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
              {editable==false && (
                <div className='flex flex-col items-center'>
                  <img src={image} alt="Profile picture" className='w-full rounded-full' />
                  <input type="file" onChange={(e) => {setFile(e.target.files[0]), setImage(URL.createObjectURL(e.target.files[0]))}} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-[200px] mt-3' />
                </div>
               )}
               {editable==true && (
                <div>
                  <img src={image} alt="Profile picture" className='w-full rounded-full' />
                </div>
               )}
                
                
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
                <div>
                { editable==true &&(
                  
                  <div id='buttons' className='flex flex-row items-center justify-evenly w-full'>
                    <button onClick={() => {setEditable(false)}} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-2/5 mt-2' >
                      Editar Datos Personales
                    </button>
                  </div>
                  )}
                  </div>
                  { editable==false &&(
                    <div className='flex items-center justify-center'>
                    <button onClick={() => {setEditable(true), updatePhoto()}} className='flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-2/5 mt-2' >
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
