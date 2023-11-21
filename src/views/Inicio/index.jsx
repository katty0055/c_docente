import { useState, useEffect } from 'react';
import Login from './Login';
import jwtDecode from 'jwt-decode';

import Pagina from '../Pagina/Pagina';
import { Link } from 'react-router-dom';


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
    console.log(`Codigo de usuario salido: ${userId}`)
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