import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Postulaciones = () => {
  const [archivos, setArchivos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Realizar la solicitud GET para obtener la lista de archivos
    axios.get('http://localhost:3000/postulaciones')
      .then(response => {
        setArchivos(response.data.archivos);
      })
      .catch(error => {
        console.error('Error al obtener la lista de archivos:', error);
      });
  }, []);

  const handleCardClick = (nombreArchivo) => {
    console.log('Archivo seleccionado:', nombreArchivo);
    
    // Pasar el nombre del archivo a través de la navegación
    navigate('../contenido', { state: { nombreArchivo: nombreArchivo } });
  };

  return (
    <Grid container spacing={2}>
      {archivos.map((archivo, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card onClick={() => handleCardClick(archivo)}>
            <CardContent>
              <CardHeader title={archivo} />
              {/* Contenido adicional si es necesario */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Postulaciones;
