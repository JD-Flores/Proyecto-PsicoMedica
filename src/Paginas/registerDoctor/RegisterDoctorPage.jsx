import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Nacionalidad } from "../../Componentes/ListasInputs/Nacionalidad";
import {
  completed,
  registerWithEmailAndPassword,
  returnError,
  setCompleted,
  signInWithGoogle,
} from "../../firebase/auth-service";
import { Link } from "react-router-dom";
import {
  LOGIN_URL,
  PERFIL_DOCTOR,
  REGISTER_DOCTOR_URL,
} from "../../constantes/urls";
import { store } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInDoctorWithGoogle } from "../../firebase/auth-service";
import { async } from "@firebase/util";
import { useForm } from "react-hook-form";

export function RegisterDoctorPage() {
  function calculateAge(date) {
    const now = new Date();
    const diff = Math.abs(now - date );
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
    return age
  } 

  const [googleLogin, setGooglelogin] = useState(false);
  const [error, setError] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [errorCountry, setErrorCountry] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [nombre1, setNombre1] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [email1, setEmail1] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      doctor: true,
      name: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      country: "",
      age: "",
      gender: "",
      profilePic:
        "https://firebasestorage.googleapis.com/v0/b/proyecto-psicomedica-6dbc5.appspot.com/o/11997cb3-d7ea-4d18-bb98-14eded4b7d89?alt=media&token=af1b567a-8a9c-4b35-8305-a702ca72330f",
      specialty: "",
      grade: "",
      Experience: "",
      Price: 1,
      ranking: 1,
      biography: "",
    },
  });

  // Para validar que las contraseñas sean iguales
  const password = useRef({});
  password.current = watch("password", "");

  //en cada input utiliza la info del campo para agregarla al form existente
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name == "age") {
      setFormData({
        ...formData,
        [name]: calculateAge(new Date(value)),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setError(returnError());
    }
  };

  const handleSignInWithGoogle = async ()=>{

    var result = await signInDoctorWithGoogle();

    if(completed()){

      let nombreSplit = result.name.split(" ");
      console.log('Split: ',nombreSplit);
      console.log('Split length: ',nombreSplit.length);

      var nombre = '';
      var apellido = '';

      if (nombreSplit.length > 3) {
        console.log('nombre y apellido doble');
        nombre = nombreSplit[0] + ' ' + nombreSplit[1];
        apellido = nombreSplit[2] + ' ' + nombreSplit[3];
      }else if (nombreSplit.length == 3) {
        console.log('nombre doble');
        nombre = nombreSplit[0] + ' ' + nombreSplit[1];
        apellido = nombreSplit[2];
      }else if (nombreSplit.length == 2) {
        console.log('Un nombre: ');
        nombre = nombreSplit[0];
        apellido = nombreSplit[1];
      }
      setNombre1(nombre);
      setApellido1(apellido);
      setEmail1(result.email);

      setGooglelogin(true)
    }else{
        navigate(REGISTER_DOCTOR_URL)
    }
  }

  const onSubmit = async (data) => {
    const { email, password, confirmPassword, ...extraData } = data; //form destructurado

    await registerWithEmailAndPassword(
      email,
      password,
      confirmPassword,
      extraData
    );
    if (completed()) {
      navigate(PERFIL_DOCTOR);
    } else {
      setError(returnError());
    }
  };

  return (
    <div className='flex justify-center items-center m-3 py-9'>
      <div className='flex justify-center items-center flex-col gap-2 max-w-lg m-3 bg-white p-6 rounded-xl shadow shadow-slate-300 h-full text-xs '>
        <p className=" my-4 p-2 font-bold pb-1 text-black text-xl text-center">Ingresa tus datos para confirmar el registro</p>

        <div className="my-5 w-4/5">
        <button onClick={handleSignInWithGoogle} className="w-full text-center text-sm py-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> <span>Continuar con Google</span>
        </button>
        </div>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-2"
        >
          <div className='flex flex-row  gap-x-4 gap-y-5'>
            <div id='leftHalf' className='w-full'>
              {/* Label Nombre */}
              <label htmlFor="name" className= "block cursor-pointer">
                <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm ">Nombre</h1><p className='text-red-600'>{errorName}</p>
                </div>
                {!googleLogin && (
                  <input 
                  id="name" name="name" type="text"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu nombre"
                  {...register("name", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}/>
                )}
                {googleLogin && (
                  <input value={nombre1}
                  readOnly={true}
                  id="name" name="name" type="text"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu nombre"/>
                )}
                {errors.name?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.name?.type === "pattern" && (
                  <p className="text-red-600">El dato ingresado no es válido</p>
                )}
              </label>
              {/* Label Apellido */}
              <label htmlFor="lastname" className="block cursor-pointer">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm ">
                    Apellido
                  </h1>
                </div>
                {!googleLogin && (
                  <input 
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  placeholder="Ingresa tu apellido"
                  {...register("lastname", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                  
                )}
                {googleLogin && (
                  <input value={apellido1}
                  readOnly={true}
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" 
                  placeholder="Ingresa tu apellido"/>
                )}
                {errors.lastname?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.lastname?.type === "pattern" && (
                  <p className="text-red-600">El dato ingresado no es válido</p>
                )}
              </label>

              {/* Label Correo */}
              <label htmlFor="email" className= "block cursor-pointer">
                <div className='flex flex-row py-1 mt-2'>
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">Correo electrónico</h1><p className='text-red-600'>{errorEmail}</p>
                </div>                   
                {!googleLogin && (
                  <input 
                    id="email"
                    name="email"
                    type="email"

                    className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" 
                    placeholder="Ingresa tu correo"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                  />
                )}
                {googleLogin && (
                  <input value={email1}
                  id="email"
                  name="email"
                  type="email"
                  readOnly={true}
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm" placeholder="Ingresa tu correo"/>
                )}
                {errors.email?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-red-600">
                    El correo ingresado no es válido
                  </p>
                )}
              </label>
              {/* Label Num Teléfono */}
              <label htmlFor="telefono">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Teléfono
                  </h1>
                  <p className="text-red-600">{errorPhone}</p>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  placeholder="Ingresa tu número de teléfono"
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]+$/i,
                    minLength: 11,
                    maxLength: 11,
                  })}
                />
                {errors.phone?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.phone?.type === "pattern" && (
                  <p className="text-red-600">Ingresa sólo números</p>
                )}
                {errors.phone?.type === "minLength" && (
                  <p className="text-red-600">
                    El número ingresado no es válido
                  </p>
                )}
                {errors.phone?.type === "maxLength" && (
                  <p className="text-red-600">
                    El número ingresado no es válido
                  </p>
                )}
              </label>
              {/* Label Password */}
              <label htmlFor="password">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Contraseña
                  </h1>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  placeholder="Ingresa tu contraseña"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    La contraseña debe tener mínimo 8 caracteres
                  </p>
                )}
              </label>
              {/* Label Confirm Password */}
              <label htmlFor="confirmPassword">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Confirmar contraseña
                  </h1>
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  placeholder="Ingresa nuevamente la contraseña"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                    validate: (value) => value === password.current,
                  })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.confirmPassword?.type === "minLength" && (
                  <p className="text-red-600">
                    La contraseña debe tener mínimo 8 caracteres
                  </p>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <p className="text-red-600">La contraseña no coincide</p>
                )}
              </label>
              {/* Label Experiencia doctor*/}
              <label htmlFor="Experience">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Años de experiencia
                  </h1>
                </div>
                <input
                  id="Experience"
                  name="Experience"
                  type="text"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  placeholder="Ingresa tus años de experiencia"
                  {...register("Experience", {
                    required: true,
                    min: 1,
                    max: 65,
                    pattern: /^[0-9]+$/i,
                  })}
                />
                {errors.Experience?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.Experience?.type === "min" && (
                  <p className="text-red-600">El dato ingresado no es válido</p>
                )}
                {errors.Experience?.type === "max" && (
                  <p className="text-red-600">El dato ingresado no es válido</p>
                )}
                {errors.Experience?.type === "pattern" && (
                  <p className="text-red-600">Ingresa sólo números</p>
                )}
              </label>
              {/* Label Precio consulta */}
              <label htmlFor="Price">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Precio por consulta
                  </h1>
                </div>
                <input
                  id="Price"
                  name="Price"
                  type="number"
                  className="sm:w-full lg:w-full w-[160px] py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  placeholder="Indique un precio"
                  {...register("Price", {
                    required: true,
                    min: 1,
                  })}
                />
                {errors.Price?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.Price?.type === "min" && (
                  <p className="text-red-600">
                    El precio ingresado no es válido
                  </p>
                )}
              </label>
            </div>
            <div id="rightHalf" className="w-full">
              {/* Label nacionalidad */}
              <label htmlFor="country">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Nacionalidad
                  </h1>
                  <p className="text-red-600">{errorCountry}</p>
                </div>
                <select
                  id="country"
                  name="country"
                  type="country"
                  defaultValue="Default"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  {...register("country", {
                    required: true,
                  })}
                  >
                  <option disabled hidden value="Default">Escoge</option>
                  <option value="Afghanistan">Afganistán</option>
                  <option value="Aland Islands">Islas Aland</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Argelia</option>
                  <option value="American Samoa">Samoa Americana</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguila</option>
                  <option value="Antarctica">Antártida</option>
                  <option value="Antigua and Barbuda">Antigua y Barbuda</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaiyán</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Baréin</option>
                  <option value="Bangladesh">Bangladés</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Bielorrusia</option>
                  <option value="Belgium">Bélgica</option>
                  <option value="Belize">Belice</option>
                  <option value="Benin">Benín</option>
                  <option value="Bermuda">Bermudas</option>
                  <option value="Bhutan">Bután</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bonaire, Sint Eustatius and Saba">Caribe neerlandés</option>
                  <option value="Bosnia and Herzegovina">Bosnia y Herzegovina</option>
                  <option value="Botswana">Botsuana</option>
                  <option value="Bouvet Island">Isla Bouvet</option>
                  <option value="Brazil">Brasil</option>
                  <option value="British Indian Ocean Territory">Territorio Británico del Océano Índico</option>
                  <option value="Brunei Darussalam">Brunéi</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Camboya</option>
                  <option value="Cameroon">Camerún</option>
                  <option value="Canada">Canadá</option>
                  <option value="Cape Verde">Cabo Verde</option>
                  <option value="Cayman Islands">Islas Caimán</option>
                  <option value="Central African Republic">República Centroafricana</option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Isla de Navidad</option>
                  <option value="Cocos (Keeling) Islands">Islas Cocos</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoras</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo, Democratic Republic of the Congo">República Democrática del Congo</option>
                  <option value="Cook Islands">Islas Cook</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'Ivoire">Côte d’Ivoire</option>
                  <option value="Croatia">Croacia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Curacao">Curazao</option>
                  <option value="Cyprus">Chipre</option>
                  <option value="Czech Republic">Chequia</option>
                  <option value="Denmark">Dinamarca</option>
                  <option value="Djibouti">Yibuti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">República Dominicana</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egipto</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Guinea Ecuatorial</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Etiopía</option>
                  <option value="Falkland Islands (Malvinas)">Islas Malvinas (Islas Falkland)</option>
                  <option value="Faroe Islands">Islas Feroe</option>
                  <option value="Fiji">Fiyi</option>
                  <option value="Finland">Finlandia</option>
                  <option value="France">Francia</option>
                  <option value="French Guiana">Guayana Francesa</option>
                  <option value="French Polynesia">Polinesia Francesa</option>
                  <option value="French Southern Territories">Territorios Australes Franceses</option>
                  <option value="Gabon">Gabón</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Alemania</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Grecia</option>
                  <option value="Greenland">Groenlandia</option>
                  <option value="Grenada">Granada</option>
                  <option value="Guadeloupe">Guadalupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernesey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bisáu</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haití</option>
                  <option value="Heard Island and Mcdonald Islands">Islas Heard y McDonald</option>
                  <option value="Holy See (Vatican City State)">Ciudad del Vaticano</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungría</option>
                  <option value="Iceland">Islandia</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran, Islamic Republic of">Irán</option>
                  <option value="Iraq">Irak</option>
                  <option value="Ireland">Irlanda</option>
                  <option value="Isle of Man">Isla de Man</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italia</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japón</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordan">Jordania</option>
                  <option value="Kazakhstan">Kazajistán</option>
                  <option value="Kenya">Kenia</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea, Democratic People's Republic of">Corea del Norte</option>
                  <option value="Korea, Republic of">Corea del Sur</option>
                  <option value="Kosovo">Kosovo</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kirguistán</option>
                  <option value="Lao People's Democratic Republic">Laos</option>
                  <option value="Latvia">Letonia</option>
                  <option value="Lebanon">Líbano</option>
                  <option value="Lesotho">Lesoto</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">Libia</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lituania</option>
                  <option value="Luxembourg">Luxemburgo</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia, the Former Yugoslav Republic of">Macedonia del Norte</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malaui</option>
                  <option value="Malaysia">Malasia</option>
                  <option value="Maldives">Maldivas</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Islas Marshall</option>
                  <option value="Martinique">Martinica</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauricio</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">México</option>
                  <option value="Micronesia, Federated States of">Micronesia</option>
                  <option value="Moldova, Republic of">Moldavia</option>
                  <option value="Monaco">Mónaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Marruecos</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar (Birmania)</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Países Bajos</option>
                  <option value="Netherlands Antilles">Curazao</option>
                  <option value="New Caledonia">Nueva Caledonia</option>
                  <option value="New Zealand">Nueva Zelanda</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Níger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Isla Norfolk</option>
                  <option value="Northern Mariana Islands">Islas Marianas del Norte</option>
                  <option value="Norway">Noruega</option>
                  <option value="Oman">Omán</option>
                  <option value="Pakistan">Pakistán</option>
                  <option value="Palau">Palaos</option>
                  <option value="Palestinian Territory, Occupied">Palestina</option>
                  <option value="Panama">Panamá</option>
                  <option value="Papua New Guinea">Papúa Nueva Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Perú</option>
                  <option value="Philippines">Filipinas</option>
                  <option value="Pitcairn">Islas Pitcairn</option>
                  <option value="Poland">Polonia</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Catar</option>
                  <option value="Reunion">Reunión</option>
                  <option value="Romania">Rumanía</option>
                  <option value="Russian Federation">Rusia</option>
                  <option value="Rwanda">Ruanda</option>
                  <option value="Saint Barthelemy">San Bartolomé</option>
                  <option value="Saint Helena">Santa Elena</option>
                  <option value="Saint Kitts and Nevis">San Cristóbal y Nieves</option>
                  <option value="Saint Lucia">Santa Lucía</option>
                  <option value="Saint Martin">San Martín</option>
                  <option value="Saint Pierre and Miquelon">San Pedro y Miquelón</option>
                  <option value="Saint Vincent and the Grenadines">San Vicente y las Granadinas</option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">Santo Tomé y Príncipe</option>
                  <option value="Saudi Arabia">Arabia Saudí</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Serbia and Montenegro">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leona</option>
                  <option value="Singapore">Singapur</option>
                  <option value="Sint Maarten">Sint Maarten</option>
                  <option value="Slovakia">Eslovaquia</option>
                  <option value="Slovenia">Eslovenia</option>
                  <option value="Solomon Islands">Islas Salomón</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">Sudáfrica</option>
                  <option value="South Georgia and the South Sandwich Islands">Islas Georgia del Sur y Sandwich del Sur</option>
                  <option value="South Sudan">Sudán del Sur</option>
                  <option value="Spain">España</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudán</option>
                  <option value="Suriname">Surinam</option>
                  <option value="Svalbard and Jan Mayen">Svalbard y Jan Mayen</option>
                  <option value="Swaziland">Esuatini</option>
                  <option value="Sweden">Suecia</option>
                  <option value="Switzerland">Suiza</option>
                  <option value="Syrian Arab Republic">Siria</option>
                  <option value="Taiwan, Province of China">Taiwán</option>
                  <option value="Tajikistan">Tayikistán</option>
                  <option value="Tanzania, United Republic of">Tanzania</option>
                  <option value="Thailand">Tailandia</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">Trinidad y Tobago</option>
                  <option value="Tunisia">Túnez</option>
                  <option value="Turkey">Turquía</option>
                  <option value="Turkmenistan">Turkmenistán</option>
                  <option value="Turks and Caicos Islands">Islas Turcas y Caicos</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ucrania</option>
                  <option value="United Arab Emirates">Emiratos Árabes Unidos</option>
                  <option value="United Kingdom">Reino Unido</option>
                  <option value="United States">Estados Unidos</option>
                  <option value="United States Minor Outlying Islands">Islas menores alejadas de EE. UU.</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistán</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Vietnam</option>
                  <option value="Virgin Islands, British">Islas Vírgenes Británicas</option>
                  <option value="Virgin Islands, U.s.">Islas Vírgenes de EE. UU.</option>
                  <option value="Wallis and Futuna">Wallis y Futuna</option>
                  <option value="Western Sahara">Sáhara Occidental</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabue</option>
                </select>
                {errors.country?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
              </label>

              {/* Label edad */}
              <label htmlFor="age">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Edad
                  </h1>
                </div>
                <input
                  id="age"
                  name="age"
                  type="number"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  placeholder="Ingresa tu edad"
                  {...register("age", {
                    required: true,
                    min: 25,
                    max: 90,
                  })}
                />
                {errors.age?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
                {errors.age?.type === "min" && (
                  <p className="text-red-600">La edad ingresada no es válida</p>
                )}
                {errors.age?.type === "max" && (
                  <p className="text-red-600">La edad ingresada no es válida</p>
                )}
              </label>

              
              {/* Label Género */}
              <label htmlFor="gender">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Género
                  </h1>
                </div>

                <select
                  id="gender"
                  name="gender"
                  className=" w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  {...register("gender", {
                    required: "Elige tu género",
                  })}
                >
                  <option value="">Elige tu género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>

                {errors.gender?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
              </label>
              {/* Label Especialidad doctor */}
              <label htmlFor="specialty">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Especialidad
                  </h1>
                </div>
                <select
                  id="specialty"
                  name="specialty"
                  className=" w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  {...register("specialty", {
                    required: "Indica tu especialidad",
                  })}
                >
                  <option value="">Indica tu especialidad</option>
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
                {errors.specialty?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
              </label>
              {/* Label Grado instrucción */}
              <label htmlFor="grade">
                <div className="flex flex-row py-1 mt-2">
                  <h1 className="font-medium text-slate-700 pb-2 text-sm">
                    Grado
                  </h1>
                </div>
                <select
                  id="grade"
                  name="grade"
                  className=" w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-sm"
                  {...register("grade", {
                    required: "Indica tu grado",
                  })}
                >
                  <option value="">Indica tu grado</option>
                  <option value="Licenciado">Licenciado</option>
                  <option value="Master">Master</option>
                  <option value="Doctor">Doctor</option>
                </select>
                {errors.grade?.type === "required" && (
                  <p className="text-red-600">El campo es requerido</p>
                )}
              </label>
              <div className="flex flex-col py-1 mt-2">
                <h1 className="font-medium text-slate-700 pb-2 text-sm">
                  Subir foto de perfil
                </h1>
                <img
                  className="rounded-full w-[110px] h-[110px] mb-2"
                  src={image}
                  alt=""
                />

                <input
                  type="file"
                  id="profilePic"	
                  name="profilePic"
                  onChange={(e) => {
                    setFile(e.target.files[0]),
                      setImage(URL.createObjectURL(e.target.files[0]));
                  }}
                  {...register("profilePic", {
                    required:false,
                  })}
                />
              </div>
            </div>
          </div>
          <p className="text-red-700">{error}</p>
          <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm">Registrarse</span>
          </button>
          <p className="text-center text-black p-2 font-medium text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={LOGIN_URL}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline text-sm"
            >
              <span>Inicia sesión. </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
