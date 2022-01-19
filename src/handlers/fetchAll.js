import axios from "axios";
const SERVER_URL = "http://localhost:3001"

async function fetchAll(obj) {
    console.log("making request to server ", obj)
    let req = await axios.get(`${SERVER_URL}/fetchAll`).catch(console.error)
    console.log(req.data.response)
    return {response: req.data.response}
}

export default fetchAll