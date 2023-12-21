import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography } from '@mui/material';

const ArchivosPostulacion = () => {
  const nombreCarpeta = 'Postulacion_20';
  const [archivos, setArchivos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerArchivos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/postulaciones/${nombreCarpeta}`);
        setArchivos(response.data.archivos);
      } catch (error) {
        console.error('Error al obtener archivos:', error);
        setError('Error al obtener archivos. Por favor, inténtalo de nuevo.');
      }
    };

    obtenerArchivos();
  }, [nombreCarpeta]);

  const descargarArchivo = async (nombreArchivo) => {
    try {
      const response = await axios.get(`http://localhost:3000/postulaciones/${nombreCarpeta}/${nombreArchivo}`, {
        responseType: 'blob',
      });

      // Crear un enlace de descarga para el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar archivo:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      {error && (
        <Grid item>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </Grid>
      )}
      {archivos.map((nombreArchivo, index) => (
        <Grid item key={nombreArchivo}>
          <Box>
            <Typography variant="body1">{nombreArchivo}</Typography>
            <Button variant="outlined" onClick={() => descargarArchivo(nombreArchivo)}>
              Descargar
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArchivosPostulacion;
