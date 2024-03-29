import React, { useState } from "react";
import { Calendario } from "../../Componentes/Calendario/Calendario";
import { DoctorNav } from "../../Componentes/ProfileNav/DoctorNav";
import { uploadFile } from "../../firebase/users-service";
import { updateProfilePic, updateInfoDoctor } from "../../firebase/users-service";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import { FeedbackCard } from "../../Componentes/FeedbackCard/FeedbackCard";
import { useForm } from "react-hook-form";
import { Nacionalidad } from "../../Componentes/ListasInputs/Nacionalidad";

export function PerfilDoctorPage() {
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
  const [update, setUpdate] = useState("");
  const [uploadConfirmmed, setUploadConfirmmed] = useState();
  const newName = watch("name");
  const newLastName = watch("lastname");
  const newNumber = watch("number");
  const newMail = watch("mail");
  const newPassword = watch("password");
  const newExperience = watch("experience");
  const newPrice = watch("price");
  const [newCountry, setNewCountry] = useState(user.country);
  const newGender = watch("gender");
  const newSpecialty = watch("specialty");
  const newGrade = watch("grade");
  const newBiography = watch("biography");

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
    const result = {
      newMail,
      newName,
      newLastName,
      newNumber,
      newPassword,
      newExperience,
      newPrice,
      newCountry,
      newGender,
      newSpecialty,
      newGrade,
      newBiography,
    };
    updateInfoDoctor(user, result);
    setUploadConfirmmed(true);
    setUpdate(true);
    setEditable(!editable);
    setUpdate(false);
    updatePhoto();
    console.log("actualizado");
  };

  const handleUser = (result) => {
    user.profilePic = result;
    setUser(user);
    console.log("prueba " + user.profilePic);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewCountry(value);
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
        <DoctorNav></DoctorNav>
      </div>

      <div
        id="bottom-container"
        className="flex flex-col p-4 w-[363px] h-4/5 bg-white rounded-[12px] 
        md:w-[583px]
        lg:w-[683px]
        xl:w-[763px]"
      >
        <div
          id="title"
          className="flex text-2xl m-2 text-[#908989] md:text-3xl lg:text-4xl"
        >
          <h1>Datos Personales</h1>
        </div>
        <div id="clientData" className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id="sub-top-container" className="flex flex-row gap-[10px]">
              <div id="leftSideNameLastName" className="w-2/4 flex flex-col md:gap-y-[20px] lg:gap-y-[25px]">
                <label htmlFor="name">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">Nombre</p>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    readOnly={editable}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={user.name}
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
                </label>

                <label htmlFor="lastname">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                    Apellido
                  </p>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    readOnly={editable}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={user.lastname}
                    {...register("lastname", {
                      required: true,
                      pattern: {
                        value: patterns.name,
                        message: messages.name,
                      },
                    })}
                  />
                  {errors.lastname?.type === "required" && (
                    <p className="text-red-600">El campo es requerido</p>
                  )}
                  {errors.lastname && <p>{errors.lastname.message}</p>}
                </label>
              </div>

              <div
                id="rightSidePicture"
                className="flex justify-center items-center w-2/4 m-2 mt-4"
              >
                <div className="flex flex-col items-center">
                  {editable == true && (
                  <img
                    src={image}
                    alt="Profile picture"
                    className="h-[160px] w-[160px] rounded-[50%]
                    md:h-[200px] md:w-[200px]
                    lg:h-[230px] lg:w-[230px]"
                  />
                  )}
                </div>

                {editable == false && (
                  <div className="flex flex-col items-center ">
                    <img
                      src={image}
                      alt="Profile picture"
                      className="h-[160px] w-[160px] rounded-[50%]
                      md:h-[200px] md:w-[200px]
                      lg:h-[230px] lg:w-[230px]"
                    />
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]),
                          setImage(URL.createObjectURL(e.target.files[0]));
                      }}
                      className="flex items-center justify-center bg-black text-white p-1  h-14 w-[200px] mt-3 rounded-[12px]"
                      {...register("profilePic", {
                        required:false,
                      })}
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

            <div id="numer-age" className="flex flex-row gap-[10px]">
              <div id="leftSideNumber" className="w-1/2">
                <label htmlFor="number">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                    Número telefónico
                  </p>
                  <input
                    id="number"
                    name="number"
                    type="tel"
                    readOnly={editable}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={user.phone}
                    {...register("number", {
                      required: true,
                      minLength: {
                        value: 11,
                        message: messages.phone,
                      },
                      maxLength: {
                        value: 11,
                        message: messages.phone,
                      },
                      pattern: {
                        value: patterns.phone,
                        message: messages.phone,
                      },
                    })}
                  />
                  {errors.number?.type === "required" && (
                    <p className="text-red-600">El campo es requerido</p>
                  )}
                  {errors.number && <p>{errors.number.message}</p>}
                </label>
              </div>

              <div id="rightSideAge" className="w-1/2">
                <label htmlFor="age">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">Edad</p>
                  <input
                    id="age"
                    name="age"
                    type="age"
                    readOnly={true}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={user.age}
                  />
                </label>
              </div>
            </div>

            <div id="email-contra" className="flex flex-col md:flex-row gap-[10px]">
              <div id="leftSideEmail" className="md:w-1/2">
                <label htmlFor="email">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                    Dirección de correo{" "}
                  </p>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    readOnly={editable}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={user.email}
                    {...register("mail", {
                      required: true,
                      pattern: {
                        value: patterns.mail,
                        message: messages.mail,
                      },
                    })}
                  />
                  {errors.mail?.type === "required" && (
                    <p className="text-red-600">El campo es requerido</p>
                  )}
                  {errors.mail && <p>{errors.mail.message}</p>}
                </label>
              </div>

              <div id="rightSideContra" className="md:w-1/2">
                <label htmlFor="password" className="block cursor-pointer">
                  <div className="">
                    <h2 className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                      Contraseña
                    </h2>

                    <input
                      className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      id="password"
                      name="password"
                      type="password"
                      readOnly={editable}
                      {...register("password", {
                        required: true,
                        pattern: {
                          value: patterns.password,
                          message: messages.password,
                        },
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-red-600">El campo es requerido</p>
                    )}
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                </label>
              </div>
            </div>
            <div id="exp-precio" className="flex flex-row gap-[10px]">
              <div id="leftSideExp" className="w-1/2">
                <label htmlFor="experiencia">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                    Experiencia
                  </p>

                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    readOnly={editable}
                    // onChange=""
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={user.experience}
                    {...register("experience", {
                      required: true,
                      minLength: {
                        value: 1,
                        message: messages.phone,
                      },
                      maxLength: {
                        value: 3,
                        message: messages.phone,
                      },
                      pattern: {
                        value: patterns.phone,
                        message: messages.phone,
                      },
                    })}
                  />
                  {errors.experience?.type === "required" && (
                    <p className="text-red-600">El campo es requerido</p>
                  )}
                  {errors.experience && <p>{errors.experience.message}</p>}
                </label>
              </div>

              <div id="rightSidePrecio" className="w-1/2">
                <label htmlFor="precio-consulta">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                    Precio por consulta
                  </p>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    readOnly={editable}
                    // onChange=""
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={user.Price}
                    {...register("price", {
                      required: true,
                    })}
                  />
                  {errors.price?.type === "required" && (
                    <p className="text-red-600">El campo es requerido</p>
                  )}
                </label>
              </div>
            </div>

            <div id="nac-gen" className="flex flex-row gap-[10px]">
              <div id="leftSideNac" className="w-1/2">
                <label htmlFor="nacionalidad">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                    Nacionalidad
                  </p>
                  <Nacionalidad
                    first={user.country}
                    editable={editable}
                    handle={handleOnChange}
                  ></Nacionalidad>
                  {errors.country?.type === "required" && (
                    <p className="text-red-600">El campo es requerido</p>
                  )}
                </label>
              </div>
              <div id="rightSideGen" className="w-1/2">
                <label htmlFor="genero">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">Género</p>

                  <select
                    id="gender"
                    name="gender"
                    defaultValue={user.gender}
                    disabled={editable}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    {...register("gender", {
                      required: true,
                    })}
                  >
                    <option value={user.gender} hidden>
                      {user.gender}
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </label>
              </div>
            </div>
            <div id="especialidad-grado" className="flex flex-row gap-[10px]">
              <div id="leftSideEspecialidad" className="w-1/2">
                <label htmlFor="especialidad">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">
                    Especialidad
                  </p>

                  <select
                    defaultValue={user.specialty}
                    id="specialty"
                    name="specialty"
                    disabled={editable}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    {...register("specialty", {
                      required: true,
                    })}
                  >
                    <option value={user.specialty} hidden>
                      {user.specialty}
                    </option>
                    <option value="Depresión">Depresión</option>
                    <option value="Trastorno bipolar">Trastorno bipolar</option>
                    <option value="Ansiedad">Ansiedad</option>
                    <option value="Trastorno obsesivo-compulsivo">
                      Trastorno obsesivo-compulsivo
                    </option>
                    <option value="Trastorno por estrés postraumático">
                      Trastorno por estrés postraumático
                    </option>
                    <option value="Trastorno por estrés agudo">
                      Trastorno por estrés agudo
                    </option>
                    <option value="Somatización">Somatización</option>
                    <option value="Disfunciones sexuales">
                      Disfunciones sexuales
                    </option>
                    <option value="Abusos sexuales">Abusos sexuales</option>
                    <option value="Dependencia emocional">
                      Dependencia emocional
                    </option>
                    <option value="Insomnio y trastornos del sueño">
                      Insomnio y trastornos del sueño
                    </option>
                    <option value="Trastornos de personalidad">
                      Trastornos de personalidad
                    </option>
                    <option value="Terapia de pareja">Terapia de pareja</option>
                    <option value="Otro">Otro</option>
                  </select>
                </label>
              </div>
              <div id="rightSideGrado" className="w-1/2">
                <label htmlFor="grado">
                  <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">Grado</p>

                  <select
                    defaultValue={user.grade}
                    id="grade"
                    name="grade"
                    type="grado"
                    disabled={editable}
                    className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    {...register("grade", {
                      required: true,
                    })}
                  >
                    <option hidden value={user.grade}>
                      {user.grade}
                    </option>
                    <option value="Licenciado">Licenciado</option>
                    <option value="Master">Master</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </label>
              </div>
            </div>

            <label htmlFor="biography">
              <p className="text-lg md:text-xl text-[#908989] mt-[5px] mb-1">Biografía</p>
              <textarea
                rows={5}
                id="biography"
                name="biography"
                type="biography"
                readOnly={editable}
                className="md:text-xl text-black w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder={user.biography}
                defaultValue={user.biography}
                {...register("biography", {
                  required: false,
                })}
              ></textarea>
            </label>

            <div>
              {editable == true && (
                <div
                  id="buttons"
                  className="flex flex-row items-center justify-evenly w-full "
                >
                  <button
                    onClick={() => {
                      setEditable(false);
                    }}
                    className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-14 w-2/5 mt-6 font-semibold md:text-lg"
                  >
                    Editar Datos Personales
                  </button>
                </div>
              )}
            </div>
            {editable == false && (
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-black text-white p-1 rounded-md h-14 w-2/5 mt-2"
                >
                  Actualizar
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
