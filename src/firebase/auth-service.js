//Metodos de autenticacion

import { createUserWithEmailAndPassword, getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup, signOut } from "@firebase/auth";
import { auth, googleProvider } from "./config";
import { createUserProfile } from "./users-service";

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
    } catch (error) {
      console.error(error)  
    }
};

export const logInWithEmailAndPassword = async(email,password)=>{
  try {
    const result = await signInWithEmailAndPassword(auth,email,password);
    console.log("Login",result)
  } catch (error) {
    console.error(error)  
  }
};

export const registerWithEmailAndPassword = async(
  email,
  password,
  extraData
  )=>{
  try {
    const result = await createUserWithEmailAndPassword(auth,email,password);
    await createUserProfile(result.user.uid,{
      email,
      password,
      ...extraData,
    })
    console.log("Register emailandpass",result)
  } catch (error) {
    console.error(error)  
  }
};

export const logout = async()=>{
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error)
  }
};