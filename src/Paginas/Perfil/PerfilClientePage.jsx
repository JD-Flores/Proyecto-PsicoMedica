import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import fotoPerfil from "../../imagenes/fotoPerfil.jpg";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import { async } from "@firebase/util";
import { getUserInfo, getUserProfile } from "../../firebase/users-service";
import { updateProfile } from "firebase/auth";
import { uploadFile } from "../../firebase/users-service";
import { updateProfilePic } from "../../firebase/users-service";
import { setSeconds } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateInfoClient } from "../../firebase/users-service";

export function PerfilClientePage() {
  const { user, setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [editable, setEditable] = useState(true);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [lastUrl, setLastUrl] = useState("");
  const [update, setUpdate] = useState("");
  const [uploadConfirmmed, setUploadConfirmmed] = useState();
  const newMail = watch("mail");
  const newName = watch("name");
  const newLastName = watch("lastname");
  const newPassword = watch("password");
  const newNumber = watch("number");

  const patterns = {
    name: /^[A-Za-z]+$/i,
    mail: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    phone: /^[0-9]+$/i,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
  };

  const messages = {
    name: "El formato introducido no es el correcto",
    phone: "Debes introducir un número correcto",
    mail: "Debes introducir una dirección correcta",
    password: ` 
    Minimo 8 caracteres
    Maximo 15 caracteres
    Al menos una letra mayúscula
    Al menos una letra minucula
    Al menos un dígito
    No espacios en blanco
    Al menos 1 caracter especial `,
  };

  const onSubmit = (data) => {
    const result = { newMail, newName, newLastName, newNumber, newPassword };
    updateInfoClient(user, result);
    setUploadConfirmmed(true);
    setUpdate(true);
    setEditable(!editable);
    setUpdate(false);
    updatePhoto();
  };

  const handleUser = (result) => {
    user.profilePic = result;
    setUser(user);
    console.log("prueba " + user.profilePic);
  };

  const pruebaPrint = () => {
    console.log("HOLA");
  };

  useEffect(() => {
    setImage(user.profilePic);
  }, []);

  const updatePhoto = async () => {
    // user.profilePic=null;
    console.log("Archivo");
    console.log(file);
    if (file != null) {
      const result = await uploadFile(file);
      if (result == null) {
        const url =
          "https://firebasestorage.googleapis.com/v0/b/proyecto-psicomedica-6dbc5.appspot.com/o/11997cb3-d7ea-4d18-bb98-14eded4b7d89?alt=media&token=af1b567a-8a9c-4b35-8305-a702ca72330f";
        updateProfilePic(user, url);
        console.log("Error, No se pudo actualizar foto de perfil");
      } else {
        updateProfilePic(user, result);
        console.log(result);
        console.log("Actualizada foto de perfil a" + result);
        handleUser(result);
      }
    }
  };

  return (
    <div
      id="main-container"
      className="flex flex-col justify-center items-center gap-[13px] py-[17px]"
    >
      <div id="top-container">
        <ProfileNav></ProfileNav>
      </div>

      <div
        id="bottom-container"
        className="flex flex-col p-4 w-[363px] h-4/5 bg-white rounded-[12px] 
        md:w-[583px]
        lg:w-[683px]
        xl:w-[763px] "
      >
        <div
          id="title"
          className="flex text-2xl m-2 text-[#908989] md:text-3xl lg:text-4xl"
        >
          <h1>Datos Personales</h1>
        </div>

        <div id="clientData" className="flex flex-col ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id="sub-top-container" className="flex flex-row gap-[10px]">
              <div id="leftSideNameLastName" className="w-2/4 ">
                <label htmlFor="name" className="block cursor-pointer">
                  <div className="py-1 mt-1">
                    <h2 className="text-xl text-black font-bold  mb-1">
                      Nombre
                    </h2>

                    <input
                      className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                      placeholder={user.name}
                      id="name"
                      name="name"
                      type="text"
                      readOnly={editable}
                      {...register("name", {
                        required: true,
                        pattern: {
                          value: patterns.name,
                          message: messages.name,
                        },
                      })}
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-red-600">El campo es requerido</p>
                    )}
                    {errors.name && <p>{errors.name.message}</p>}
                  </div>
                </label>

                <label htmlFor="lastname" className="block cursor-pointer">
                  <div className="py-1 md:py-3 lg:py-6 mt-1">
                    <h2 className="text-lg text-black font-bold  mb-1">
                      Apellido
                    </h2>

              <input
                className="w-[200px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                id="lastname"
                name="lastname"
                type="text"
                readOnly={editable}
                {...register("lastname", {
                  required: true,
                  pattern: {
                    value: patterns.name,
                    message: messages.name
                  }
                })}
              />
              {errors.lastname?.type === "required" && 
                (<p className="text-red-600">El campo es requerido</p>)
            }
            {errors.lastname && <p>{errors.lastname.message}</p>}
            </div>
            </label>

            <label htmlFor="number" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-lg text-black font-bold  mb-1">Número</h2>

              <input
                className="w-[200px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                placeholder={user.phone}
                id="number"
                name="number"
                type="tel"
                readOnly={editable}
                {...register("number", {
                  required: true,
                  minLength: {
                    value: 11,
                    message: messages.phone
                  },
                  maxLength: {
                    value: 11,
                    message: messages.phone
                  },
                  pattern: {
                    value: patterns.phone,
                    message: messages.phone
                  }
                })}
              />
              {errors.number?.type === "required" && 
                (<p className="text-red-600">El campo es requerido</p>)
            }
            {errors.number && <p>{errors.number.message}</p>}
            </div>
            </label>

            <label htmlFor="age" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-lg text-black font-bold  mb-1">Edad</h2>

              <input
                placeholder={user.age}
                className="w-[200px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                id="age"
                name="age"
                type="tel"
                readOnly={editable}
                {...register("age", {
                  required: true,
                  minLength: {
                    value: 1,
                    message: messages.phone
                  },
                  maxLength: {
                    value: 3,
                    message: messages.phone
                  },
                  pattern: {
                    value: patterns.phone,
                    message: messages.phone,
                  }
                })}
              />
              {errors.age?.type === "required" && 
                (<p className="text-red-600">El campo es requerido</p>)
            }
            {errors.age && <p>{errors.age.message}</p>}
            </div>
            </label>

            <label htmlFor="age" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-lg text-black font-bold  mb-1">Contraseña</h2>

              <input
                placeholder={user.password}
                className="w-[200px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                id="password"
                name="password"
                type="password"
                readOnly={editable}
                {...register("password", {
                  required: true,
                  pattern: {
                    value: patterns.password,
                    message: messages.password,
                  }
                })}
              />
              {errors.password?.type === "required" && 
                (<p className="text-red-600">El campo es requerido</p>)
            }
            {errors.password && <p>{errors.password.message}</p>}
            </div>
            </label>


            <label htmlFor="email" className="block cursor-pointer">
            <div className="py-1 mt-1">
              <h2 className="text-xl text-black font-bold  mb-1">Email</h2>

              <input
                className="w-[200px] p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                placeholder={user.email}
                id="email"
                name="email"
                type="text"
                readOnly={editable}
                {...register("mail", {
                  required: true,
                  pattern: {
                    value: patterns.mail,
                    message: messages.mail
                  }
                })}
              />
              {errors.mail?.type === "required" && 
                (<p className="text-red-600">El campo es requerido</p>)
            }
            {errors.mail && <p>{errors.mail.message}</p>}
            </div>
            </label>

          {/* <input className=" cursor-pointer flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium" type="submit" value="Confirmar cambios" /> */}


                {/* {editable == false && (
              <div className="flex items-center justify-center">
                <input
                  type="submit"
                  value="Actualizar"
                  onClick={() => {
                    setEditable(true), updatePhoto();
                  }}
                  className="flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-2/5 mt-2" 
                  
                />
              
              </div>
            )} */}
              </div>

              <div
                id="rightSidePicture"
                className="flex justify-center items-center w-2/4"
              >
                <div id="picture" className="flex flex-col items-center">
                  <img
                    src={image}
                    alt="Profile picture"
                    className=" h-[160px] w-[160px] rounded-[50%]
                    md:h-[200px] md:w-[200px]
                    lg:h-[230px] lg:w-[230px]"
                  />
                </div>

                {editable == false && (
                  <div className="flex flex-col items-center">
                    <img
                      src={image}
                      alt="Profile picture"
                      className=" h-[160px] w-[178px] rounded-[50%]"
                    />
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]),
                          setImage(
                            URL.createObjectURL(
                              e.target.files[0],
                              console.log("prueba")
                            )
                          );
                      }}
                      className="flex items-center justify-center bg-black text-white p-1  h-14 w-[200px] mt-3"
                    />
                  </div>
                )}

                {/* {editable==true && (
                <div>
                  <img src={user.profilePic} alt="Profile picture" className='w-full ' />
                </div>
               )} */}
            </div>
          </div>

          <div id="sub-bottom-container" className="flex flex-col">
            

            <div>
              
              <div className="flex items-center justify-center w-full">
                {editable==false && < button className=" cursor-pointer flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium" type="submit" >Actualizar</button>}  
              </div>

                {editable == true && (
                  <div
                    id="buttons"
                    className="flex flex-row items-center justify-evenly w-full "
                  >
                    <button
                      onClick={() => {
                        setEditable(!editable), setUploadConfirmmed(false);
                      }}
                      className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-14 w-2/5 mt-6 font-semibold"
                    >
                      Editar Datos Personales
                    </button>
                  </div>
                )}

                {editable == false && (
                  <div
                    id="buttons"
                    className="flex flex-row items-center justify-evenly w-full "
                  >
                    {update == false && <p>Actualiza primero sus cambios</p>}

                    {uploadConfirmmed ? (
                      <p>Actualización de datos exitosa</p>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
