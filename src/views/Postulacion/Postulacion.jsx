import { useEffect, useState } from 'react';
import {useConcursoData} from '../../state/useState';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import theme from '../../components/Temas/theme';


function Postulacion() {
  const { concursoData } = useConcursoData();
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const concursoId = concursoData.concurso_id;
  const [puestos, setPuestos] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState('');
  const [selectedDependencia, setSelectedDependencia] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [dependencias, setDependencias] = useState(['---']);
  const [direcciones, setDirecciones] = useState(['---']);
  const [areas, setAreas] = useState(['---']);




  useEffect(() => {
    const prevConcursoId = concursoId;
    fetch(`http://127.0.0.1:8000/concurso/puesto/?concurso_id=${concursoId}`)
      .then(response => response.json())
      .then(data => {
        // Verifica si el valor de concursoId ha cambiado antes de actualizar el estado
      if (prevConcursoId === concursoId) {
        setPuestos(data);  // Almacena los puestos en el estado
      }
      })
      .catch(error => {
        console.error('Error al obtener los puestos:', error);
      });
  }, [concursoId]);


  const handleCargoChange = (event) => {
    const selectedCargo = event.target.value;
    // Filtra las direcciones que pertenecen al cargo seleccionado
    const direccionesFiltradas = puestos
      .filter(puesto => puesto.cargo.descripcion_cargo === selectedCargo && puesto.direccion)
      .map(puesto => puesto.direccion.descripcion_direccion);
  
    // Elimina duplicados en el array de direcciones
    const direccionesUnicas = [...new Set(direccionesFiltradas)];
  
    // Actualiza el estado de dependencias
    setDirecciones(direccionesUnicas);
  };


  const handleDireccionChange = (event) => {
    const selectedDireccion = event.target.value;
  
    // Filtra las dependencias que pertenecen a la dirección seleccionada
    const dependenciasFiltradas = puestos
      .filter(puesto => puesto.direccion.descripcion_direccion === selectedDireccion && puesto.dependencia)
      .map(puesto => puesto.dependencia.descripcion_dependencia);
  
    // Elimina duplicados en el array de dependencias
    const dependenciasUnicas = [...new Set(dependenciasFiltradas)];
  
    // Actualiza el estado de dependencias
    setDependencias(dependenciasUnicas);
  };



  const handleDependenciaChange = (event) => {
    const selectedDependencia = event.target.value;
  
    // Filtra las dependencias que pertenecen a la dirección seleccionada
    const areasFiltradas = puestos
      .filter(puesto =>  puesto.dependencia && puesto.dependencia.descripcion_dependencia  === selectedDependencia && puesto.area)
      .map(puesto => puesto.area.descripcion_area);
  
    // Elimina duplicados en el array de dependencias
    const areasUnicas = [...new Set(areasFiltradas)];
  
    // Actualiza el estado de dependencias
    setAreas(areasUnicas);
  }; 

  const buscarPuesto = () => {
    // Filtra los puestos que cumplen con las condiciones    
    const puestoEncontrado = puestos.find(
      (puesto) =>
        puesto.cargo.descripcion_cargo === selectedCargo &&
        puesto.direccion.descripcion_direccion === selectedDireccion &&
        puesto.dependencia?.descripcion_dependencia === selectedDependencia &&
        puesto.area?.descripcion_area === selectedArea
    );
  
    if (puestoEncontrado) {
      console.log('ID del puesto encontrado:', puestoEncontrado.puesto_id);
      // Puedes hacer algo con el ID del puesto, como almacenarlo en un estado, etc.
    } else {
      console.log('No se encontró un puesto que cumpla con las condiciones.');
    }
  };
  
  
  const cargosUnicos = [...new Set(puestos.map(puesto => puesto.cargo.descripcion_cargo))];

  const inputText = [
    {
      id:"Año",
      label:"Año",
      valor:concursoData.anho_concurso,
      type:'text',
    },
    {
        id:"Fecha Postulacion",
        label:"Fecha Postulacion",
        valor:formattedDate,
        type:'text',
    },
    {
        id:"Concurso Id",
        label:"Concurso",
        valor:concursoData.denominacion_conc,
        type:'text',
    },
    {
      id:"Cargo",
      label:"Cargo",
      valor: selectedCargo, 
      type: 'select',
      options: cargosUnicos,    
      handleChange: (event) => {
        setSelectedCargo(event.target.value);  
        handleCargoChange(event);                            
      },
    },
    {
      id: 'Direccion',
      label: 'Direccion',
      valor: selectedDireccion,
      type: 'select',
      options: direcciones,
      handleChange: (event) => {
        setSelectedDireccion(event.target.value);
        handleDireccionChange(event); // Llama a la nueva función al cambiar la dirección
      },
    },
    {
      id: 'Dependencia',
      label: 'Departamento',
      valor: selectedDependencia, 
      type: 'select',
      options: dependencias,
      handleChange: (event) => {
        setSelectedDependencia(event.target.value);
        handleDependenciaChange(event)
      },
    },
    {
      id: 'Area',
      label: 'Area',
      valor: selectedArea, 
      type: 'select',
      options: areas,    
      handleChange: (event) => {
        setSelectedArea(event.target.value);                              
      },
    }, 
    {
        id:"Puesto",
        label:"Puesto",
        valor:concursoData.anho_concurso,
        type:'text',
    },
  ];
  

  return (   
    <Box 
        component="form"
        // onSubmit={loginHandle}
        autoComplete="off"        
        sx={{
            border:4, 
            height:'100%',
            borderColor: "primary.dark",
            display:'flex',
            flexDirection:'column',
            gap:2,
            boxSizing:'border-box',
            overflow:'auto',        
        }}>
            <Typography
                variant="h1"
                textAlign= "center"
                color="primary.main"
                fontWeight= "bold"
              > 
                Formulario de postulacion
              </Typography> 
        
              {inputText.map((item) => (
        <Grid item key={item.id}>
          {item.type === 'text' && (
            <TextField
              id={item.id}
              label={item.label}
              type={item.type}
              variant="outlined"
              value={item.valor}
              size={window.innerWidth >= 900 ? "medium" : "small"}
              required
              sx={{
                background: theme.palette.primary.contrastText,
              }}
            />
          )}

{item.type === 'select' && (
            <FormControl fullWidth>
              <InputLabel id={`${item.id}-label`}>{item.label}</InputLabel>
              <Select
                labelId={`${item.id}-label`}
                id={item.id}
                label={item.label}
                value={item.valor}
                variant="outlined"
                size={window.innerWidth >= 900 ? 'medium' : 'small'}
                required
                sx={{
                  background: theme.palette.primary.contrastText,
                  width: '100%',
                }}
                onChange={item.handleChange}
              >
                {item.options.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
      ))}         
           
             <Button size="small"   variant="contained" color="primary" 
                 sx={{
                  fontSize: theme.typography.body2, // Ajusta el tamaño de la letra según tus necesidades
                  fontWeight: 'bold',
                }}
                onClick={buscarPuesto}
                // onClick={() => handlePostularClick(concurso.concurso_id)}
                >
                    Registrar Postulacion
                    </Button>


    </Box>

  );
}

export default Postulacion;
