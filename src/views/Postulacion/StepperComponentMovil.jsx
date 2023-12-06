import { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent, Button, Typography } from '@mui/material';
import Postulacion from './Postulacion';  // Importa tu componente Postulacion
import DatosPersonales from './Postulacion';  // Reemplaza con el componente real
import Documentos from './Postulacion';  // Reemplaza con el componente real

const getSteps = () => ['Datos del Puesto', 'Datos Personales', 'Documentos'];

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

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
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{ marginRight: 2 }}
                >
                  {index === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
                {index !== 0 && (
                  <Button variant="outlined" color="primary" onClick={handleBack}>
                    Atrás
                  </Button>
                )}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepperComponent;
