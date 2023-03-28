import { async } from "@firebase/util";
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import{collection, doc,setDoc, where,query,getDocs, updateDoc, getDoc} from "firebase/firestore"
import{db} from "./config"
import { ref, uploadBytes,getDownloadURL } from "firebase/storage"
import { store } from "../firebase/config"
import { v4 } from "uuid";

export async function createUserProfile(userId,data){
    console.log(data)
     setDoc(doc(db,'userChat',userId),{});
     if(data.doctor != false){
     setDoc(doc(db,'calendarios',userId),{citas:[]});
     }
    return setDoc(doc(db,'users',userId),data);
}

export async function getUserInfo(){
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}

export async function getUserProfile(email){
    const userQuery = query(collection(db,"users"), where("email","==",email));

    const results = await getDocs(userQuery);
    //comprueba el tamano de users y retorna la informacion de usuario
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        const [user] = users;
        return user;
    }else{
        return null;
    }    
}

export async function getDoctorById(id){
    const userQuery = query(collection(db,"users"), where("uid","==",id));

    const results = await getDocs(userQuery);
    //comprueba el tamano de users y retorna la informacion de usuario
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        const [user] = users;
        return user;
    }else{
        return null;
    }    
}

export async function getDoctorsInfo(){
    const usersQuery = query(collection(db,"users"), where("doctor","==",true));

    const results = await getDocs(usersQuery);
    //comprueba el tamano de users y retorna los usuarios
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }
        ));
        return users;
    }else{
        return null;
    }    
}

export async function searchDoctorsAvailable(star, specialization){

    if (star=="vacio") {
        const usersQuery = query(collection(db,"users"), where("doctor","==",true), where("specialty","==", specialization));

    const results = await getDocs(usersQuery);
    //comprueba el tamano de users y retorna los usuarios
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }
        ));
        return users;
    }else{
        return null;
    }   
    }
    else if(specialization == "vacio"){
        const usersQuery = query(collection(db,"users"), where("doctor","==",true), where("ranking","==",star));

    const results = await getDocs(usersQuery);
    //comprueba el tamano de users y retorna los usuarios
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }
        ));
        return users;
    }else{
        return null;
    } 
    }
    else if(specialization=="vacio" && star=="vacio"){
        return [];
    }
    else{
        const usersQuery = query(collection(db,"users"), where("doctor","==",true), where("specialty","==", specialization), where("ranking","==",star));

    const results = await getDocs(usersQuery);
    //comprueba el tamano de users y retorna los usuarios
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }
        ));
        return users;
    }else{
        return null;
    }    
    }

    
}

export async function searchDoctorsAvailableByName(doctorName){

    if (doctorName!="vacio") {
        const usersQuery = query(collection(db,"users"), where("doctor","==",true), where("name","==", doctorName));

    const results = await getDocs(usersQuery);
    //comprueba el tamano de users y retorna los usuarios
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }
        ));
        return users;
    }else{
        return null;
    }   
    }
    
   

    
}

    export const getCalendar = async (uid) =>{
    const calendar= await getDoc(doc(db, "calendarios", uid ));
    return calendar;
}



export const updateProfilePic = (user, result) => {

    const docRef = doc(db, "users", user.uid)

    const data= {
      profilePic: result
    }

    updateDoc(docRef, data).then(docRef => {
    console.log("A New Document Field has been added to an existing document");
})
    
}


export const updateInfoClient = (user, result) => {

    const docRef = doc(db, "users", user.uid)
    const data= {
      email: result.newMail,
      name: result.newName,
      lastname: result.newLastName,
      password: result.newPassword,
      phone: result.newNumber,
    }

    updateDoc(docRef, data).then(docRef => {
    console.log("A New Document Field has been added to an existing document");

    const auth = getAuth();


        updateEmail(auth.currentUser, result.newMail).then(() => {
        console.log("actualizado el email")
        updatePassword(auth.currentUser, result.newPassword).then(() => {
            // Update successful.
            console.log("actualizado el password")
        });
        // ...
        }).catch((error) => {
        console.log("error mail");
        // ...
        });

        

        

        

})
}

export const uploadFile = async (file) => {
    const storageRef = ref(store, `profilePictures/${v4()}`);
    await uploadBytes (storageRef, file);
    const url =  await getDownloadURL(storageRef);
    return url;
  }


