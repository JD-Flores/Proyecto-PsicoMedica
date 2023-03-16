//Metodos de autenticacion

import { createUserWithEmailAndPassword, getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup, signOut } from "@firebase/auth";
import { auth, googleProvider } from "./config";
import { createUserProfile } from "./users-service";

let Error="";
let complete=false;

const Validacion = (error)=>{
    if(error=="auth/user-not-found"){
      Error="Usuario o contraseña incorrectos"

    }if (error=="auth/internal-error") {
      Error="Ingrese los datos correctamente"
    } if(error=="auth/invalid-email") {
      Error="Email invalido"
    }if(error=="auth/wrong-password") {
      Error="Contraseña incorrecta"
    }if(error=="auth/email-already-in-use") {
      Error="Este correo ya se encuentra registrado"
    }
    }
    export function returnError(){
      return Error;
    }
    export function completed(){
      return complete;
    }

export const signInWithGoogle = async()=>{
    try {
        const result = await signInWithPopup(auth,googleProvider)//abre la ventana de login de google
        
        const {isNewUser}=getAdditionalUserInfo(result);
        if(isNewUser){
          await createUserProfile(result.user.uid,{
            email: result.user.email,
            name: result.user.displayName,
            doctor:false,
            phone: "",
            
          })
        }
        complete=true;
    } catch (error) {
      Validacion(error) 
    }
};

export const logInWithEmailAndPassword = async(email,password)=>{
  try {
    const result = await signInWithEmailAndPassword(auth,email,password);
    complete=true;
  } catch (error) {
    Validacion(error)  
  }
};

export const registerWithEmailAndPassword = async(
  email,
  password,
  confirmPassword,
  extraData
  )=>{
    if(password==confirmPassword){
  try {
    const result = await createUserWithEmailAndPassword(auth,email,password);
    await createUserProfile(result.user.uid,{
      email,
      password,
      ...extraData,
    })
    complete=true;
    
  } catch (error) {
    Validacion(error.code)  
  }
  }else{
    Error="Las contraseñas no coinciden"
  }
};

export const logout = async()=>{
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error)
  }
};