import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, useMediaQuery } from '@mui/material';
import Postulacion from './Postulacion';  // Importa tu componente Postulacion
import DatosPersonales from './Postulacion';  // Reemplaza con el componente real
import Documentos from './Postulacion';  // Reemplaza con el componente real

const getSteps = () => ['Datos del Puesto', 'Datos Personales', 'Documentos'];

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();
  const isScreenSmall = useMediaQuery('(max-width:600px)');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Postulacion />;
      case 1:
        return <DatosPersonales />;
      case 2:
        return <Documentos />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box 
      sx={{ 
        width: '90%', 
        // border: 4, 
        m: 'auto', 
        height: '90%',
        backgroundColor: 'primary.contrastText',
        borderRadius: 2,
      }}>
        <Typography
          variant="h1"
          textAlign= "center"
          color="primary.main"
          fontWeight= "bold"
          margin={3}
        > 
          Formulario de postulacion
        </Typography> 
       <Stepper 
        sx={{ margin: 3 }}
        activeStep={activeStep} orientation={isScreenSmall ? 'vertical' : 'horizontal'}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ marginTop: 4 }}>
        <Typography>{getStepContent(activeStep)}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ marginRight: 2 }}
            disabled={activeStep === steps.length - 1}
          >
            Siguiente
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Atrás
          </Button>
        </Box>
      </Box> 
    </Box>
  );
};

export default StepperComponent;
