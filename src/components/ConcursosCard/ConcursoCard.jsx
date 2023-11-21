import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect, useState } from "react";
import { MenuBook } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import theme from "../Temas/theme";
import { useNavigate } from 'react-router-dom';



const ConcursoCard = () =>{
    const apiUrl = 'http://127.0.0.1:8000/concurso/concurso/';
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handlePostularClick = () => {
      // Redirigir a la ruta de postulación
      navigate('/postulacion');
    };

    useEffect(() => {
        // Hacer la solicitud HTTP
        fetch(apiUrl, {
          method: 'GET',  // Método de la solicitud
          headers: {
            'Accept': 'application/json',
          },
          // Puedes agregar más opciones como body si es necesario
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            // Guardar los datos en el estado
            setData(data);
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
      }, [apiUrl]); // Se ejecuta cuando el componente se monta y cuando cambia la URL
    
      // Renderizar el componente con base en el estado de "data"

    return(
        <Box sx={{ 
            display: 'flex',
            mt: 3, 
            padding: 2,
            boxSizing:"border-box",
            justifyContent: { xs: 'center', xm: 'center', sm: 'flex-start' },
            position:"relative",
            gap:3,
            flexWrap:'wrap',
            }}>            
             {data && data.map(concurso => (
              <Card 
                key={concurso.concurso_id}
                sx={{ 
                width:{ xs: '100%', xm: '45%', sm:'30%', md:'25%'},
                height:{ xs: 180, xm: 200, sm:180, md:180},
                border:4,
                borderRadius: 2,
                borderStyle: "double",
                boxShadow: 4,
                borderColor: "primary.dark",
                display:'flex',
                flexDirection:"column",
                justifyContent:'space-between'
                }}>
                <CardActionArea>
                <CardMedia
                  component="i"
                  style=
                  {{
                    display:'flex',
                    justifyContent:'center',
                  }}
                > 
                  <MenuBook sx={{ color: 'primary.dark', }}/>
                </CardMedia>
                  <CardContent>
                    <Typography gutterBottom 
                    variant="body2" 
                    component="div"
                    textAlign="center" 
                    color="primary.light" 
                    fontWeight="medium"
                    sx={{
                      height: 60, // Altura fija para el área de texto
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    >
                       {concurso.denominacion_conc}
                    </Typography>
                    </CardContent>
                    <CardContent style={{display:"flex", flexDirection:"row", padding:0,justifyContent:"center", alignItems:"center"}}>
                    <Typography 
                      variant="body2"  
                      textAlign="center" 
                      color="primary.light" 
                      fontWeight="regular">
                         Mas Info
                     </Typography>
                     <AddCircleIcon sx={{ color: 'primary.dark', fontSize:"small"}} />
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ p:0,}}>
                <Button size="small"   variant="contained" color="primary" fullWidth
                 sx={{
                  fontSize: theme.typography.body2, // Ajusta el tamaño de la letra según tus necesidades
                  fontWeight: 'bold',
                }}
                onClick={handlePostularClick}
                >
                    Postular
                    </Button>
                </CardActions>
              </Card>
                 ))}
              
             
        </Box>
    )
}
export default ConcursoCard;




