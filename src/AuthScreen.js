import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";

function AuthScreen({setLogin}) {

    let [toggle, setToggle] = useState(false)

    return(<div>
        Auth Screen
        {toggle
        ? <Register setLogin={setLogin}/>
        : <Login setLogin={setLogin}/>}
        <>
          <button onClick={()=> setToggle(!toggle)}> toggle register/login</button>
        </>
      

    </div>)
}

export default AuthScreen;