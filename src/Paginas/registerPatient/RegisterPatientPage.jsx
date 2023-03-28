import {
  LOGIN_URL,
  PERFIL_CLIENTE,
  REGISTER_PATIENT_URL,
} from "../../constantes/urls";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  completed,
  returnError,
  signInWithGoogle,
} from "../../firebase/auth-service";
import { registerWithEmailAndPassword } from "../../firebase/auth-service";

export function RegisterPatientPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState();

  //const para el login con google
  const handleSigninWithGoogle = async () => {
    await signInWithGoogle();
    if (completed()) {
      navigate(PERFIL_CLIENTE);
    } else {
      navigate(REGISTER_PATIENT_URL);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      doctor: false,
      name: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      profilePic:
        "https://firebasestorage.googleapis.com/v0/b/proyecto-psicomedica-6dbc5.appspot.com/o/11997cb3-d7ea-4d18-bb98-14eded4b7d89?alt=media&token=af1b567a-8a9c-4b35-8305-a702ca72330f",
    },
  });

  // Para validar que las contraseñas sean iguales
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { email, password, confirmPassword, ...extraData } = data; //form destructurado

    await registerWithEmailAndPassword(
      email,
      password,
      confirmPassword,
      extraData
    );
    if (completed()) {
      navigate(PERFIL_CLIENTE);
    } else {
      setError(returnError());
    }
  };

  //en cada input utiliza la info del campo para agregarla al form existente
  // const handleOnChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium text-center p-2">Registrar Cuenta</h1>

      <div className="my-5">
        <button
          onClick={handleSigninWithGoogle}
          className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-6 h-6"
            alt=""
          />{" "}
          <span>Continuar con Google</span>
        </button>
      </div>

      <form action="" id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="name">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Nombre</h1>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              // onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu nombre"
              {...register("name", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
                minLength: 3
              })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600">El campo es requerido</p>
            )}
            {errors.name?.type === "pattern" && (
              <p className="text-red-600">El dato ingresado no es válido</p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="text-red-600">El nombre ingresado no es válido</p>
            )}
          </label>
          <label htmlFor="lastname">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Apellido</h1>
            </div>
            <input
              id="lastname"
              name="lastname"
              type="text"
              // onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu apellido"
              {...register("lastname", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
                minLength: 3
              })}
            />
            {errors.lastname?.type === "required" && (
              <p className="text-red-600">El campo es requerido</p>
            )}
            {errors.lastname?.type === "pattern" && (
              <p className="text-red-600">El dato ingresado no es válido</p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="text-red-600">El apellido ingresado no es válido</p>
            )}
          </label>
          <label htmlFor="email">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Correo electrónico
              </h1>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              // onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu correo electrónico"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">El campo es requerido</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-600">El correo ingresado no es válido</p>
            )}
          </label>
          <label htmlFor="telefono">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Número de teléfono
              </h1>
            </div>
            <input
              id="phone"
              name="phone"
              type="text"
              // onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
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
              <p className="text-red-600">El número ingresado no es válido</p>
            )}
            {errors.phone?.type === "maxLength" && (
              <p className="text-red-600">El número ingresado no es válido</p>
            )}
          </label>
          <label htmlFor="password">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Contraseña</h1>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              // onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
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
          <label htmlFor="confirmPassword">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Confirmar contraseña
              </h1>
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              // onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
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
          <button
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            type="submit"
          >
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
            <span>Registrarse</span>
          </button>
          <p className="text-center text-black">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={LOGIN_URL}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline"
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
        </div>
      </form>
    </div>
  );
}
