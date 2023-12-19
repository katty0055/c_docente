import { Box, Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FormularioInternoDocumento = ({ inputText, selectedFiles, setSelectedFiles }) => {
 
  const handleDrop = (event) => {
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];

    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = file;
    setSelectedFiles(newSelectedFiles);
  };

  return (
    <Grid
      item
      container
      justifyContent={'space-around'}
      alignItems={'center'}
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
      {inputText.map((item, index) => (
        <Box
          xs={12} xm={11} sm={6} md={4}
          component={Grid}
          item container
          key={item}
          sx={{
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
          {selectedFiles[index] ? (
            <>
              <UploadFileIcon sx={{ fontSize: 60, mx: 'auto' }} />
              <Typography variant="body2" textAlign="center">
                {selectedFiles[index].name}
              </Typography>
            </>
          ) : null}
          <Box
            sx={{
              p: 0,
              height: '28%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Campo de entrada de archivos */}
            <Button fullWidth variant="contained" component="label">
              Subir archivo
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => handleFileChange(e, index)}
              />
            </Button>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

FormularioInternoDocumento.propTypes = {
  inputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFiles: PropTypes.array.isRequired,
  setSelectedFiles: PropTypes.func.isRequired,
};
export default FormularioInternoDocumento;
