import Button  from "@mui/material/Button";
import {Grid, Typography, Box, TextField, InputAdornment } from "@mui/material";
import Logo from './../../../assets/Logocorporativo.jpeg'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import styled from "@emotion/styled";
import { useState } from "react";
// import theme from "../../components/Temas/theme";
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';





const Login = ({ onLogin }) => {
  const [documento, setDocumento] = useState('')
  const [password, setPassword] = useState('')
  // const navigateTo = useNavigate();
  
  const registroHandle = () => {
    // navigateTo('/registro');
    console.log("navigate")
  };
  
  const loginHandle = (e) => {
    e.preventDefault()
    try {
      fetch('http://127.0.0.1:8000/concurso/auth/jwt/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        documento,
      }),
      
    })
      .then((res) => res.json())     
      .then((tokenData) => {
        window.localStorage.setItem('accessToken', JSON.stringify(tokenData.access))
        console.log(tokenData);
        console.log(jwtDecode(tokenData.access).user_id);
        console.log(jwtDecode(tokenData.access).user_id);
        onLogin(jwtDecode(tokenData.access).user_id)
      })
    } catch (error) {
      //captura el error
      console.log(error);
      //muestra un mensaje de error al usuario
      alert('Error al iniciar sesión')
;     //window.localStorage.removeItem('accessToken')
    }
  }
  
  const Img =styled("img")({
    display: "flex",
    minHeight:26,
    '@media (min-width:0px)': {
      height: "5vh" ,
    },
    '@media (min-width:600px)': {
      height: "8.9vh" ,
    },
    '@media (min-width:900px)': {
      height: "11vh",
    },
    '@media (min-width:1200px)': {
      height: "11.7vh",
    },
  });

  return (
    <>
     <Grid item container fixed="true"
     xs={10} sm={9} md={8} lg={7}
     justifyContent="center"
     alignItems="center"
     height="100vh"
     sx={{
        //  border:4,
         mx: "auto",
         position: "relative",
         minWidth: 220,
         minHeight: 290,
     }}
     >
       <Grid item 
          xs={12} sm={11} md={10} lg={9} 
          height={"86%"}
          justifyContent="space-around"
          alignItems="center"
          sx={{
            backgroundColor: 'primary.contrastText',
            // border:4,
            borderRadius: 2,
            borderStyle: "double",
            boxShadow: 4,
            borderColor: "primary.dark",
            pt:1,
            pb:2,
            display: "flex",
            flexDirection: "column",
            gap:0.5,
            boxSizing:"border-box",
            }}
        >
          <Grid item container
            xs={12} sm={11} md={10} lg={9} 
            height={"18%"} 
            // width={'90%'}
            // height={"auto"}
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: 'primary.contrastText',
              // border:4,
              display:"flex",
              p:0.6,
            }}
          >
            <Img src={Logo} alt="Logo" /> 
          </Grid>

           <Grid item container
              xs={12} sm={11} md={10} lg={9} 
              maxHeight={"14%"} 
              justifyContent="center"
              alignItems="center"                  
              sx={{
                // border:6,
                borderColor: "secondary.main",
              }}    
            >  
             <Typography
                variant="h3"
                textAlign= "center"
                color="primary.main"
                fontWeight= "medium"
              > 
                Iniciar Sesión
              </Typography>                   
            </Grid> 
              <Box  
                component="form"
                onSubmit={loginHandle}
                autoComplete="off"        
                sx={{
                  height:"60%",
                  // border:4,
                  mx:2,
                  display: "flex",
                  // justifyContent:"space-around",  
                  flexDirection:"column",     
                  gap: 0.5,   
                  width:"80%",                              
                }}
              >
                <TextField
                  id="usuario"
                  label="usuario"
                  type="text"
                  variant="outlined"
                  size={window.innerWidth >= 900 ? "medium" : "small"}
                  required
                  onChange={(e) => {
                    setDocumento(e.target.value)
                  }}
                        // error={error.error}
                        // helperText={error.message}                 
                  value={documento}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon fontSize="small"/>
                      </InputAdornment>
                    ),
                  }}                
                /> 
                <TextField
                  id="contraseña"
                  label="contraseña"
                  type="password"
                  variant="outlined"
                  size={window.innerWidth >= 900 ? "medium" : "small"}
                  required
                        // error={error.error}
                        // helperText={error.message}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}  
                  value={password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" >
                        <KeyIcon fontSize="small"/>
                      </InputAdornment>
                    ),
                  }}                
                />      
                           
             

                  <Button 
                    variant="contained" 
                    color="primary"
                    type="submit"                 
                  >
                  <Typography
                    variant="h6"
                    textAlign= "center"
                  >
                    Confirmar
                  </Typography>
              </Button> 
              </Box>
                <Grid item 
                  xs={12} sm={11} md={10} lg={9} 
                  maxHeight={"16%"} 
                  justifyContent={"center"}
                  sx={{
                    // border:4,
                    borderColor: "secondary.main",
                    display:"flex",
                    flexDirection:"column",
                  }}    
                > 
                  <Typography
                    variant="body2"
                    textAlign= "center"
                    fontWeight= "regular"
                  >
                    Registrarse
                  </Typography> 
                  <Typography
                    variant="body2"
                    textAlign= "center"
                    fontWeight= "regular"
                    onClick={registroHandle}
                    >
                    Restablecer contraseña
                  </Typography> 
                </Grid>  
            </Grid>
     </Grid>
    
            
    </>
  )
}


Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // Agrega la validación de 'onLogin'
};


export default Login;


