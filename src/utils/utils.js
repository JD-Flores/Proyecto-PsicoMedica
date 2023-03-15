import axios from "axios";

export async function getRandomPeople(){
    return axios.get("https://randomuser.me/api/?results=100")
}