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
    export function setCompleted(){
      complete=false;
      return complete;
    }

export const signInWithGoogle = async()=>{
    try {
        const result = await signInWithPopup(auth,googleProvider)//abre la ventana de login de google
        
        const {isNewUser}=getAdditionalUserInfo(result);
        if(isNewUser){
          await createUserProfile(result.user.uid,{
            uid:result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            doctor:false,
            phone: "",
            profilePic:"https://firebasestorage.googleapis.com/v0/b/proyecto-psicomedica-6dbc5.appspot.com/o/11997cb3-d7ea-4d18-bb98-14eded4b7d89?alt=media&token=af1b567a-8a9c-4b35-8305-a702ca72330f",

            
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
    const result = await createUserWithEmailAndPassword(auth,email,password,extraData);
    await createUserProfile(result.user.uid,{
      uid:result.user.uid,
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