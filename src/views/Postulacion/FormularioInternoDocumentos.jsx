import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
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
  const isScreenSmall = useMediaQuery('(max-width:600px)');

  return (
    <Grid
      item
      container
      // justifyContent={'space-around'}
      alignItems={'center'}
      xs={12} sm ={12}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        position: 'relative',
        borderColor: 'primary.dark',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxSizing: 'border-box',
        overflow: 'auto',
        // padding: 2,
        mx: 'auto',        
        my: {xs: 0, xm:0, sm:0 }      
      }}
    >
       <Grid
          xs={12} 
          item container
          sx={{
            border: 4,
            borderRadius: 2,
            borderStyle: 'double',
            boxShadow: 4,
            borderColor: 'primary.dark',
            display: 'flex',
            flexDirection: 'row',
            position:'relative',

            // justifyContent: 'center',
            // mx: ,
          
          }}
        >
       {inputText.map((item, index) => (
        <Grid
          xs={12} sm={6} md={4}
          item container
          key={item}
          sx={{
            height: {xs: 105, sm:150, }  ,
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
              <UploadFileIcon sx={{ fontSize: {xs: 30, xm:30, sm:50 }, mx: 'auto' }} />
              <Typography variant="body2" textAlign="center" component="div"
                 sx={{
                  m:'auto',
                 overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  //maxHeight: '2em', // Ajusta según tu preferencia
                  maxWidth: { xs:240,xm:250,sm:350}
                }}
              >
                {selectedFiles[index].name}
              </Typography>
            </>
          ) : null} 
          <Box
            sx={{
              p: 0,
              // border:4,
              // height: '28%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position:'relative',
            }}
          >
            {/* Campo de entrada de archivos */}
             <Button fullWidth variant="contained" component="label"
               size={isScreenSmall ? 'small' : 'medium'}
            >
              Subir archivo
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => handleFileChange(e, index)}
              />
            </Button> 
          </Box>
         </Grid>
      ))} 
      </Grid>
    </Grid>
  );
};

FormularioInternoDocumento.propTypes = {
  inputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFiles: PropTypes.array.isRequired,
  setSelectedFiles: PropTypes.func.isRequired,
};
export default FormularioInternoDocumento;
