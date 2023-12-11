import { useEffect, useState } from 'react';
import {useConcursoData} from '../../state/useState';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import theme from '../../components/Temas/theme';
import { useUserData } from '../../state/useState';


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
  const { userId } = useUserData();
  const [datosPostulacion,setDatosPostulacion] = useState({
    "anho": null,
    "fecha_postulacion": null,
    "concurso": null,
    "cargo": null,
    "usuario": null,
    "puesto": null,  
  });


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
      console.log('ID del puesto encontrado:', puestoEncontrado);
      console.log(datosPostulacion);
      setDatosPostulacion({
        "anho": puestoEncontrado.anho_puesto,
        "fecha_postulacion": today.toISOString(),
        "concurso": puestoEncontrado.concurso.concurso_id,
        "cargo": puestoEncontrado.cargo.cargo_id,
        "usuario": userId,
        "puesto": puestoEncontrado.puesto_id,  
      });
      console.log(datosPostulacion);
         // Realiza la solicitud POST a la API
   fetch('http://127.0.0.1:8000/concurso/postulacion/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosPostulacion),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Aquí puedes manejar la respuesta del servidor, como actualizar la interfaz de usuario o redirigir a otra página
    })
    .catch(error => {
      console.error('Error al enviar la postulación:', error);
    });
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
      width: 120,
    },
    {
        id:"Fecha Postulacion",
        label:"Fecha Postulacion",
        valor:formattedDate,
        type:'text',
        width: 160,
    },
    {
        id:"Concurso",
        label:"Concurso",
        valor:concursoData.denominacion_conc,
        type:'text',
        width: 600,
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
      width: 300,
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
      width: 300,
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
      width: 100,
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
      width: 100,
    }, 
    {
        id:"Puesto",
        label:"Puesto",
        valor:concursoData.anho_concurso,
        type:'text',
        width: 100,
    },
  ];
  

  return (   
    <Box 
        component="form"
        autoComplete="off"        
        sx={{
            border:4, 
            height:'100%',
            width: '100%',
            position:'relative',
            borderColor: "primary.dark",
            display:'flex',
            flexDirection:'row',
            flexWrap: 'wrap',
            alignItems:'center',
            justifyContent:'space-evently',
            // gap:2,
            boxSizing:'border-box',
            // overflow:'auto',   
            padding:2,  
            mx:'auto',   
        }}
      >
              {inputText.map((item) => (
        <Grid item key={item.id}
          sx = {{
            margin: 1,
          }}
        >
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
                width: item.width,
                background: theme.palette.primary.contrastText,
              }}
            />
          )}
          {item.type === 'select' && (
            <FormControl>
              <InputLabel id={`${item.id}-label`}>{item.label}</InputLabel>
              <Select
                labelId={`${item.id}-label`}
                id={item.id}
                label={item.label}
                value={item.options.includes(item.valor) ? item.valor : ''}
                variant="outlined"
                size={window.innerWidth >= 900 ? 'medium' : 'small'}
                required
                sx={{
                  background: theme.palette.primary.contrastText,
                  width: item.width,
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
        >
          Registrar Postulacion
        </Button>
    </Box>
  );
}

export default Postulacion;
