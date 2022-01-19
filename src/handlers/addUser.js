import axios from "axios";
const SERVER_URL = "http://localhost:3001"

async function addUser(obj) {
    console.log("making request to server ", obj)
    let req = await axios.post(`${SERVER_URL}/addUser`, obj).catch(console.error)
    console.log("response from server" + req.data.response)
    return {response: req.data.response}
}

export default addUser