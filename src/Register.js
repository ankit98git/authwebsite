import React, { useState } from "react";
import addUser from "./handlers/addUser";


function Register({setLogin}) {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleSubmit = async (event) => {
        let obj = {};

        obj.email = email
        obj.first_name = fname
        obj.last_name = lname
        obj.password = password

        if(password2!==password) {
            return alert("Passwords dont match")
        }

        //Prompt to confirm password

        //TODO VALIDATION

        // TODO HASH PASSWORD

        // MAKING CALLS TO OUR API SERVER
        let req = await addUser(obj)

        if(req.response===null) return alert("INVALID REQUEST")


        req.response.timestamp = Date.now()
        localStorage.setItem("authState", JSON.stringify(req.response))
        setLogin(true)
    }

    return (
        <>
            Register Screen
            <div className="Register">
                    <input required onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email"></input>
                    <br/>
                    <input required onChange={(e) => setFname(e.target.value)} value={fname} placeholder="Enter your first name"></input>
                    <br/>
                    <input onChange={(e) => setLname(e.target.value)} value={lname} placeholder="Enter your last name"></input>
                    <br/>
                    <input required onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Choose a password"></input>
                    <br/>
                    <input required onChange={(e) => setPassword2(e.target.value)} value={password2} placeholder="Confirm your password"></input>
                    <br/>
                    <button onClick={handleSubmit}>Register</button>
            </div>
        </>
    )

}

export default Register;