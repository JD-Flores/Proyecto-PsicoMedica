import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext';
import fotoPerfil from '../../imagenes/fotoPerfil.jpg'
import { ProfileNav } from '../../Componentes/ProfileNav/ProfileNav';
import { async } from '@firebase/util';
import { getUserInfo, getUserProfile } from '../../firebase/users-service';
import { updateProfile } from 'firebase/auth';
import { uploadFile } from '../../firebase/users-service';
import { updateProfilePic } from '../../firebase/users-service';
import { useEffect } from 'react';

export function PerfilClientePage() {

  const{user}=useUser();

  const [editable, setEditable] = useState(true);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState(null);

  const getInfo = async  () => {
    const result = await getUserProfile(user.email);
    // console.log(result.profilePic);
    return result.profilePic;
  }
  
  useEffect(() => {  
    // setInfo(getInfo(user.email));
    // console.log(info);
    setImage(user.profilePic);
    console.log(user.profilePic);
   },[]);


  const updatePhoto = async() =>{
    user.profilePic=null;
    const result = await uploadFile(file);
    if (result==null) {
      const url =  "https://firebasestorage.googleapis.com/v0/b/proyecto-psicomedica-6dbc5.appspot.com/o/11997cb3-d7ea-4d18-bb98-14eded4b7d89?alt=media&token=af1b567a-8a9c-4b35-8305-a702ca72330f";
      updateProfilePic(user,url);
      console.log("Error, No se pudo actualizar foto de perfil");
      
    }
    else{
      
      updateProfilePic(user,result);
      console.log("Actualizada foto de perfil a" + result);
    }
  }

  return (
    <div id='main-container' className='flex flex-col justify-center items-center gap-[13px] py-[17px]'>
      <div id='top-container'>
        <ProfileNav></ProfileNav>
      </div>
      
      <div id='bottom-container' className='flex flex-col p-4 w-[363px] h-4/5 items-center bg-white rounded-[12px]'>
            
        <div id='title' className='flex text-left text-2xl  text-[#908989] '>
          <h1>Datos Personales</h1>
        </div>

        <div id='clientData' className='flex flex-col'>
          <div id='sub-top-container' className='flex flex-row gap-[10px]'>
            <div id='left-side' className='w-2/4 '>
              <label htmlFor="name">
                <p className="font-medium text-[#908989] mt-[5px]">Nombre</p>
                <input 
                id="name" name="name" type="text" readOnly={editable}
                // onChange=""
                className="text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.name}/>
              </label>
              <label htmlFor="number">
                <p className="font-medium text-[#908989] mt-[5px]">Número telefónico</p>
                <input 
                id="number" name="number" type="text" readOnly={editable}
                // onChange=""
                className="text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.phone}/>
              </label>
              <label htmlFor="age">
                <p className="font-medium text-[#908989] mt-[5px]">Edad</p>
                <input 
                id="age" name="age" type="age" readOnly={editable}
                // onChange=""
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.age}/>
              </label>
            </div>

            <div id='right-side' className='flex justify-center items-center w-2/4'>
              
                <div className='flex flex-col items-center'>
                  <img src={image} alt="Profile picture" className='w-full ' />
                </div>

                {editable==false && (
                <div className='flex flex-col items-center'>
                  <img src={image} alt="Profile picture" className='w-full ' />
                  <input type="file" onChange={(e) => {setFile(e.target.files[0]), setImage(URL.createObjectURL(e.target.files[0]))}} className='flex items-center justify-center bg-black text-white p-1  h-14 w-[200px] mt-3' />
                </div>
               )}
               {/* {editable==true && (
                <div>
                  <img src={user.profilePic} alt="Profile picture" className='w-full ' />
                </div>
               )} */}
               
              
            </div>
          </div>

          <div id='sub-bottom-container' className='flex flex-col'>
            
            <label htmlFor="email">
                <p className="font-medium text-[#908989] mt-[5px]">Direccion de correo </p>
                <input 
                id="email" name="email" type="email" readOnly={editable}
                // onChange=""
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={user.email}/>
            </label>
            
            <div>
              { editable==true &&(
                <div id='buttons' className='flex flex-row items-center justify-evenly w-full '>
                  <button onClick={() => {setEditable(false)}} className='flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-14 w-2/5 mt-2' >
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
  )
}
