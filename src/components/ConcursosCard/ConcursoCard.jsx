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
import {useConcursoData} from "../../state/useState";



const ConcursoCard = () =>{
    const apiUrl = 'http://127.0.0.1:8000/concurso/concurso/';
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const concursoDataStore = useConcursoData();
    

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
      const handlePostularClick = (concurso) => {
        // Redirigir a la ruta de postulación
        concursoDataStore.setConcursoData(concurso);
        navigate(`postulacion2`);
      };
    return(
        <Box sx={{ 
            display: 'flex',
            // mt: 6, 
            padding: 1,
            boxSizing:"border-box",
            justifyContent: { xs: 'center', xm: 'center', sm: 'space-evently' },
            position:"relative",
            gap:{ xs: 2, xm: 2, sm: 1},
            flexWrap:'wrap',


            }}>            
             {data && data.map(concurso => (
              <Card 
                key={concurso.concurso_id}
                sx={{ 
                width:{ xs: '100%', xm: '87%', sm:190, md:220, lg:290},
                // height:{ xs: 260, xm: 260, sm:220},
                height:'auto',
                border:4,
                borderRadius: 2,
                borderStyle: "double",
                boxShadow: 4,
                borderColor: "primary.dark",
                display:'flex',
                flexDirection:"column",
                justifyContent:'space-between',
                }}>
                <CardActionArea 
                  sx={{ 
                   height:'91%', 
                   display:'flex',
                   flexDirection:'column',
                   justifyContent:'space-between'                
                  }}>
                <CardMedia
                  component="div"
                  style=
                  {{
                    display:'flex',
                    justifyContent:'center', 
                             
                  }}
                > 
                  <MenuBook sx={{ color: 'primary.dark', my:1,}}/>
                </CardMedia>
                  <CardContent sx={{ }}>
                    <Typography 
                    variant="body2"
                    component="div"
                    textAlign="center" 
                    color="primary.light" 
                    fontWeight="medium"
                    sx={{
                      height:{ xs: "auto", xm: "auto", sm:100, md:100, lg:100},
                      // maxHeight:{ xs: 120, xm: 90, sm:160},
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',   
                              
                    }}
                    >
                       {concurso.denominacion_conc}
                    <Typography 
                    variant="body2" 
                    component="div"
                    textAlign="center" 
                    color="primary.dark" 
                    fontWeight='bold'
                    sx={{
                      // height:{ xs: 30, xm: 30, sm:30, md:180},
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',                      
                    }}
                    >
                       {concurso.anho_concurso}
                    </Typography>
                    </Typography>
                   
                    {/* </CardContent>
                    <CardContent style={{display:"flex", flexDirection:"row", padding:0,justifyContent:"center", alignItems:"center"}}> */}
                    <Typography  
                      variant="subtitle1"  
                      textAlign="center" 
                      component="div"
                      color="primary.light" 
                      fontWeight="regular"
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center', 
                        justifyContent:'center',                     
                      }}
                      >
                        Mas Info  
                        <AddCircleIcon sx={{ color: 'primary.dark', fontSize:"small"}} />
                     </Typography>
                    
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ p:0, height:'13%',}}>
                <Button size="small"   variant="contained" color="primary" fullWidth
                 sx={{
                  fontSize: theme.typography.body2, // Ajusta el tamaño de la letra según tus necesidades
                  fontWeight: 'bold',
                }}
                onClick={() => handlePostularClick(concurso)}
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




