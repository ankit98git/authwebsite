import React, { useEffect, useState } from 'react';
import AuthScreen from './AuthScreen';
import fetchAll from './handlers/fetchAll';
import getUser from './handlers/getUser';
import Login from './Login';
import Register from './Register';


function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [allUsers, setAllUsers] = useState([])

  const logout = () => {
    localStorage.removeItem("authState")
    setLoggedIn(false)
  }

  useEffect(() => {

    (async () => {
      let authState = localStorage.getItem("authState")

      if(!authState) return;

      const obj = JSON.parse(authState)

      console.log(obj)

      // check if the authstate in storage has expired
      if (obj?.timestamp > 1440 * 60 * 60) {
        setLoggedIn(false)
        logout()
      }

      // validate auth state with server

      let req = await getUser(obj)

      if (req.response.email === obj.email && req.response.password === obj.password) {
        console.log("validation successfull")
        setLoggedIn(true)
        setUserInfo(obj)
        
        const fetchUsers = await fetchAll();

        console.log(fetchUsers.response)

        setAllUsers(() => [...fetchUsers.response])

      }

      // set loggedIn state if validation is successfull
    })()

  }, [])

  return (
    <div className="App">
      {loggedIn
        ? <div>
          <>
          Your account details
          {userInfo && <UserCred name={userInfo.first_name} email={userInfo.email} firstname={userInfo.first_name} lastname={userInfo.last_name} />}
          </>
          
          <>
          List of all registered users
          {allUsers.length >0 && allUsers.map((e, i) => <div className='AllUsers' key={i}> <li>Name : {`${e.first_name} ${e.last_name}`} | Email : {e.email}</li> </div>) }
          
          <button onClick={logout}>Logout</button>
          </>
        </div>
        : <div> 
            <AuthScreen setLogin={setLoggedIn}/>
          </div>
      }
    </div>
  );
}


function UserCred({ name, email, firstname, lastname }) {
  return (
    <ul>
      <li>Name: {`${firstname} ${lastname}`}</li>
      <li>Email: {email}</li>
    </ul>
  )
}

export default App;
