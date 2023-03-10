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
}
