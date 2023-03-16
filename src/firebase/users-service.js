import{collection, doc,setDoc, where,query,getDocs} from "firebase/firestore"
import{db} from "./config"

export async function createUserProfile(userId,data){
    return setDoc(doc(db,'users',userId),data);
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