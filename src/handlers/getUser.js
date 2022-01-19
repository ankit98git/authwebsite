import axios from "axios";
const SERVER_URL = "http://localhost:3001"

async function getUser(obj) {
    console.log("making request to server ", obj)
    let req = await axios.post(`${SERVER_URL}/getUser`, obj).catch(console.error)
    console.log(req.data.response)
    return {response: req.data.response}
}

export default getUser