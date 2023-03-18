import { ref, uploadBytes,getDownloadURL } from "firebase/storage"
import { store } from "../firebase/config"
import { v4 } from "uuid";


export const uploadFile = async (file) => {
    const storageRef = ref(store, `profilePictures/${v4()}`);
    await uploadBytes (storageRef, file);
    const url =  await getDownloadURL(storageRef);
    return url;
  }