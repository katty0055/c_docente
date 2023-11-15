import { useState, useEffect } from 'react';
import Login from './Login';
import jwtDecode from 'jwt-decode';

import Pagina from '../Pagina/Pagina';


function Inicio() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    if (token){
      setUserId(jwtDecode(JSON.parse(token)).user_id)
    }
  }, []);

  const onLoginHandler = (userId) => {
    console.log(`Codigo de usuario: ${userId}`)
    setUserId(userId)
  };

  const onLogoutHandler = () => {
    setUserId(null)
    window.localStorage.removeItem('accessToken')
  };


  return (
    <>
      {userId ? (
        <Pagina onLogout={onLogoutHandler} userId={userId} /> 
      ) : (
        <Login onLogin={onLoginHandler} />
      )}
    </>
  );
}

export default Inicio;