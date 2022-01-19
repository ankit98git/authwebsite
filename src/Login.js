import React, { useState } from "react";
import getUser from "./handlers/getUser";

function Login({setLogin}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")


    const handleSubmit = async () => {
        let obj = {}

        obj.email = email
        obj.password = password

        // TODO add validation

        // TODO HASH PASSWORD

        let req = await getUser(obj);

        console.log(req.response)

        if(req.response===null) return alert("INVALID CREDENTIALS")

        req.response.timestamp = Date.now()

        localStorage.setItem("authState", JSON.stringify(req.response))

        setLogin(true)
    }

    return (
        <>
            Login Screen
            <div className="Login">
                    <input required onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email"></input>
                    <br/>
                    <input required onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password"></input>
                    <br/>
                    <button onClick={handleSubmit}>Login</button>
                    <br/>
            </div>
        </>
    )

}

export default Login;