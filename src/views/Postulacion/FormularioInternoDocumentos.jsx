import  { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';


const FormularioInternoDocumento = ({ inputText }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    // Obtén el primer archivo soltado
    const selected = files[0];
    // Actualiza el estado con el archivo seleccionado
    setSelectedFile(selected);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      item
      container
      justifyContent={'space-around'}
      xs={12}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        position: 'relative',
        borderColor: 'primary.dark',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxSizing: 'border-box',
        overflow: 'auto',
        padding: 2,
        mx: 'auto',
      }}
    >
      {inputText.map((item) => (
        <Box
          key={item}
          sx={{
            width: { xs: '100%', xm: '90%', sm: 220, md: 250, lg: 320 },
            height: 150,
            border: 4,
            borderRadius: 2,
            borderStyle: 'double',
            boxShadow: 4,
            borderColor: 'primary.dark',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="body2"
            component="div"
            textAlign="center"
            color="primary.dark"
            fontWeight="bold"
          >
            {item}
          </Typography>
          <Box sx={{ p: 0, height: '13%' }}>
            {/* Campo de entrada de archivos */}
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Box>
          {selectedFile && (
            <Typography variant="body2" textAlign="center">
              Archivo seleccionado: {selectedFile.name}
            </Typography>
          )}
        </Box>
      ))}
    </Grid>
  );
};

FormularioInternoDocumento.propTypes = {
  inputText: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FormularioInternoDocumento;
