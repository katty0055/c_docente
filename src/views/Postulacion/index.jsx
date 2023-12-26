import { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, Grid, useMediaQuery } from '@mui/material';
import FormularioInternoDocumento from './FormularioInternoDocumentos';
import FormularioInternoPersona from './FormularioInternoPersona';
import FormularioInternoPuesto from './FormularioInternoPuesto';
import { useConcursoData, useUserData} from '../../state/useState';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const getSteps = () => ['Datos del Puesto', 'Datos Personales', 'Documentos'];

const Postulacion = () => {

  //Formulario Interno
  const { concursoData } = useConcursoData();
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const concursoId = concursoData.concurso_id;
  const [puestos, setPuestos] = useState([]);
  const [cargos, setCargos] = useState(['---']);
  const [selectedDireccion, setSelectedDireccion] = useState('');
  const [selectedDependencia, setSelectedDependencia] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedSede, setSelectedSede] = useState('');
  const [selectedTurno, setSelectedTurno] = useState('');
  const [dependencias, setDependencias] = useState(['---']);
  const [direcciones, setDirecciones] = useState(['---']);
  const [areas, setAreas] = useState(['---']);  
  const [turnos, setTurnos] = useState(['---']); 
  
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

  const handleSedeChange = (event) => {
    const selectedSede = event.target.value;
    // Filtra las direcciones que pertenecen al cargo seleccionado
    const cargosFiltrados = puestos
      .filter(puesto => puesto.sede.descripcion_sede === selectedSede && puesto.sede)
      .map(puesto => puesto.cargo.descripcion_cargo);
    // Elimina duplicados en el array de direcciones
    const cargosUnicos = [...new Set(cargosFiltrados)];
    // Actualiza el estado de dependencias
    setCargos(cargosUnicos);
  };

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

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value; 
    // Filtra las areas que pertenecen a la dependencia seleccionada
    const turnosFiltrados = puestos
      .filter(puesto =>  puesto.area && puesto.area.descripcion_area  === selectedArea && puesto.turno)
      .map(puesto => puesto.turno.descripcion_turno);

    //console.log(turnosFiltrados)
    // Elimina duplicados en el array de dependencias
    const turnosUnicos = [...new Set(turnosFiltrados)];
    // Actualiza el estado de dependencias
    setTurnos(turnosUnicos)

  };

  

  const getFormData= () => {
    // Filtra los puestos que cumplen con las condiciones    
    const puestoEncontrado = puestos.find(
      (puesto) =>
        puesto.cargo.descripcion_cargo === selectedCargo &&
        puesto.direccion.descripcion_direccion === selectedDireccion &&
        puesto.dependencia?.descripcion_dependencia === selectedDependencia &&
        puesto.area?.descripcion_area === selectedArea &&
        puesto.sede?.descripcion_sede === selectedSede
    );
    if (puestoEncontrado) {
      // console.log('ID del puesto encontrado:', puestoEncontrado);
      // console.log(datosPostulacion);
      setDatosPostulacion({
        "anho": puestoEncontrado.anho_puesto,
        "fecha_postulacion": today.toISOString(),
        "concurso": puestoEncontrado.concurso.concurso_id,
        "cargo": puestoEncontrado.cargo.cargo_id,
        "usuario": userId,
        "puesto": puestoEncontrado.puesto_id,  
      });
      //console.log(datosPostulacion);       
   }
   };

  const sedesUnicas = [...new Set(puestos.map(puesto => puesto.sede.descripcion_sede))];


  const inputTextPuesto = [
    {
      id:"Concurso",
      label:"Concurso",
      valor:concursoData.denominacion_conc,
      type:'text',   
    },
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
      id:"Sede",
      label:"Sede",
      valor: selectedSede, 
      type: 'select',
      options: sedesUnicas,    
      handleChange: (event) => {
        setSelectedSede(event.target.value);  
        handleSedeChange(event);   
        getFormData()                         
      },
    },
  
    {
      id:"Cargo",
      label:"Cargo",
      valor: selectedCargo, 
      type: 'select',
      options: cargos,    
      handleChange: (event) => {
        setSelectedCargo(event.target.value);  
        handleCargoChange(event);   
        getFormData()                         
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
        getFormData();
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
        handleDependenciaChange(event);
        getFormData()    
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
        handleAreaChange(event); 
        getFormData()                              
      },
    }, 
    {
      id: 'Turno',
      label: 'Turno',
      valor: selectedTurno, 
      type: 'select',
      options: turnos,    
      handleChange: (event) => {
        setSelectedTurno(event.target.value);   
        getFormData()                              
      },
    },
   
  ];


  //Persona
  const [datosPersona, setDatosPersona] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/concurso/usuarioFp/${userId}`)
      .then(response => response.json())
      .then(data => {
        // Verifica si el valor de concursoId ha cambiado antes de actualizar el estado
       // console.log('usuario',data);
        setDatosPersona(data);  // Almacena los puestos en el estado

      })
      .catch(error => {
        console.error('Error al obtener los puestos:', error);
      });
  }, [userId]);

// Función para formatear la fecha
function formatearFecha(fecha) {
  // Verificar si la fecha es válida
  if (!fecha) {
    return 'Fecha no disponible';
  }

  // Formatear la fecha (ejemplo: 'dd-MM-yyyy')
  return format(new Date(fecha), 'dd-MM-yyyy');
}

  const inputTextPersona= [
    {
      id:"CI",
      label:"Cedula de Identidad",
      valor:datosPersona.documento,
      type:'text',
      width: 3,
    },
    {
      id:"Telefono",
      label:"Telefono",
      valor:datosPersona.telefono,
      type: 'text',  
      width: 3.5,
    },
    {
      id: 'Sexo',
      label: 'Sexo',
      valor:datosPersona.sexo,
      type: 'text',
      width: 3,
    }, 
    {
      id:"Nombres",
      label:"Nombres",
      valor:datosPersona.nombre,
      type:'text',
      width: 5,
    },
    {
      id:"Apellidos",
      label:"Apellidos",
      valor:datosPersona.apellido,
      type:'text',
      width: 5,
    },
   
    {
      id: 'Direccion de Domicilio',
      label: 'Direccion de Domicilio',
      valor:datosPersona.direccion_particular,
      type: 'text',      
      width: 5,
    },
   
    {
      id: 'Correo',
      label: 'Correo',
      valor:datosPersona.email,
      type: 'text',      
      width: 5,
    },     
    {
      id: 'Lugar de Nacimiento',
      label: 'Lugar de Nacimiento',
      valor:datosPersona.lugar_nacimiento,
      type: 'text',     
      width: 5,
    }, 
    {
      id: 'Fecha de Nacimiento',
      label: 'Fecha de Nacimiento',
      valor:  formatearFecha(datosPersona.fecha_nacimiento),
      type: 'text',     
      width: 5,
    },
  ];
  
  //Documentos
  

  const inputTextDocumento= [
    {
      id:'Auxiliar de Enseñanza',
      documentos: [
        'CEDULA DE IDENTIDAD',
        'CURRICULUM VITAE',
        'TITULO DE GRADO',
        'ANTECEDENTES DISCIPLINARIOS',
        'FOTO CARNET',
        'OTRO',
      ],
    },   
  ];


  //Caja Externa
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const navigate = useNavigate();

  const handleNext = () => {  
    getFormData()  
    // Llama a la función handleGetFormData antes de cambiar el paso
    setActiveStep((prevActiveStep) => prevActiveStep + 1);    
  };

  const handleBack = () => {

    if (activeStep === 0) {
      // Aquí debes realizar la redirección a la página anterior, por ejemplo, usando React Router
      // Reemplaza '/pagina-anterior' con la ruta correcta de tu página anterior
      navigate('/concurso_docente/');
    } else {    
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const [selectedFiles, setSelectedFiles] = useState(new Array(inputTextDocumento[0].documentos.length).fill(null));

  const handleFinish = async () => {
    //console.log(selectedFiles);
  
    try {
      // Parte 1: Realizar la postulación
      const postulacionResponse = await fetch('http://127.0.0.1:8000/concurso/postulacion/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosPostulacion), // Ajusta los datos de postulación según tus necesidades
      });
  
      if (postulacionResponse.ok) {
        const postulacionData = await postulacionResponse.json();
       // console.log('Respuesta de postulación:', postulacionData);
  
        // Obtener el ID de la postulación
        const postId = postulacionData.postulacion_id;
  
        // Parte 2: Guardar los archivos después de la postulación
        const formData = new FormData();
  
        // Utilizar el ID de la postulación como nombre de la carpeta
        const nombreCarpeta = `Postulacion_${postId}`;
        formData.append('nombreCarpeta', nombreCarpeta);
  
        // Agregar archivos al FormData
        for (const file of selectedFiles) {
          formData.append('archivos', file);
        }
  
        const archivosResponse = await fetch('http://localhost:3000/crearcarpeta', {
          method: 'POST',
          body: formData,
        });
  
        if (archivosResponse.ok) {
          const archivosData = await archivosResponse.json();      
          console.log('Respuesta de carga de archivos:', archivosData);
          console.log('Respuesta de carga de archivos2:', archivosData.urlCarpeta);


       
      // Parte 3: Guardar datos del documento en la base de datos para cada archivo
      for (const archivo of archivosData.archivos) {
        const documentoData = {
          path_documento: `${archivosData.urlCarpeta}/${archivo}`,
          //path_documento: 'hola/hola',
          es_privado: false,
          estado_documento: 'activo', // Ajusta según tus necesidades
          vigente: false,
          tipo_documento: null,
        };


       
        
        const guardarDocumentoResponse = await fetch('http://127.0.0.1:8000/concurso/documento/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(documentoData),
        });

        if (guardarDocumentoResponse.ok) {
         const documentoGuardadoData = await guardarDocumentoResponse.json();

    // Imprimir la respuesta completa para depurar
    console.log('Respuesta completa al guardar documento:', documentoGuardadoData);

    // Asegurarse de ajustar según la estructura real de la respuesta
    const documentoId = documentoGuardadoData.documento_id ;

    if (documentoId != undefined) {
      console.log(`Documento "${archivo}" guardado exitosamente en la base de datos. ID: ${documentoId}`);
      
      const documentoPostulacionData = {
        "aprobado": false,
        "postulacion": postId,
        "documento": documentoId // Aquí asignas el ID del documento a la propiedad "documento" en documentoPostulacionData
      };

          console.log(documentoPostulacionData)

          const guardarRelacionResponse = await fetch('http://127.0.0.1:8000/concurso/documentopostulacion/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(documentoPostulacionData),
          });
          if (guardarRelacionResponse.ok) {
            console.log('Relacion guardada')
          }else{
            console.log('Error al guardar la relacion')
          }

    }
        } else {
          const guardarDocumentoErrorData = await guardarDocumentoResponse.json();
          console.error(`Error al guardar documento "${archivo}" en la base de datos:`, guardarDocumentoErrorData.error);
          // Manejar el error si es necesario
        }
      }

        } else {
          const archivosErrorData = await archivosResponse.json();
          console.error('Error en la carga de archivos:', archivosErrorData.error);
          // Manejar el error de carga de archivos si es necesario
        }
      } else {
        const postulacionErrorData = await postulacionResponse.json();
        console.error('Error en la postulación:', postulacionErrorData.error);
        // Manejar el error de postulación si es necesario
      }
      navigate(`/concurso_docente/`);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  
  
  const isScreenSmall = useMediaQuery('(max-width:600px)');


  const getStepContent = (step) => {
    switch (step) {
      case 0:
         return <FormularioInternoPuesto inputText={inputTextPuesto} />;
      case 1:
         return <FormularioInternoPersona inputText={inputTextPersona} />;
      case 2:
        //console.log(inputTextDocumento[0].documentos)
         return  <FormularioInternoDocumento
         inputText={inputTextDocumento[0].documentos}
         selectedFiles={selectedFiles}
         setSelectedFiles={setSelectedFiles}
       />
      default:
        return 'Unknown step';
    }
  };
  

  return (
    <Grid item container 
      xs={12} xm={12} sm ={11}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{         
        borderRadius: 2,
        borderStyle: "double",
        boxShadow: 4,
        borderColor: "primary.dark",
        m: 'auto', 
        backgroundColor: 'primary.contrastText',
        display:'flex',
        flexDirection: {xs :'row', xm:'row', sm:'row' } , 
        position:'relative',
        boxSizing:'border-box',
        
      }}>
        <Typography
          variant="h2"
          textAlign= "center"
          color="primary.main"
          fontWeight= "bold"
          marginTop={2}
          mx={'auto'}
          // border={4}
        > 
          Formulario de postulacion
        </Typography> 
        
       <Stepper 
        sx={{ margin: {xs :'auto', xm:'auto', sm:2,  },  width: '90%',}}
        activeStep={activeStep} orientation={ 'horizontal'}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
            <Typography variant={isScreenSmall ? 'subtitle1' : 'subtitle1'}>
              {label}
            </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper> 
       <Grid 
         xs={12} 
        sx={{
          display:'flex',
          flexDirection:'column', 
          // justifyContent:'center', 
          // border:4,
          height: '85%',
          // mx:'auto',
      
        }}>
        {getStepContent(activeStep)}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',          
            marginY: 2, 
            marginX:{xs :2, xm:3, sm:4 },
            // marginRight:5, 
            // border:4, 
            // width:'100%',
            //height:'12%',
          }}>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            // sx={{ marginRight: 2 }}
          >
            Atrás
          </Button>

         {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            // sx={{ marginRight: 2 }}
          >
            Siguiente
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinish}  // Agrega una nueva función para manejar la finalización
            //sx={{ marginRight: 2 }}
          >
            Terminar
          </Button>
        )}
        
        </Box>
      </Grid>  
    </Grid> 
  );
};

export default Postulacion;
