// al ejecutar el sigueinte codigo me rederige a la pagina "concurso_creado" pero no se guarda los datos que se ingreso en el formulario en la base de datos, como podria solucionar eso en el codigo que tengo a continuacion? :

// a partir del siguiente codigo que tengo en el archivo "CrearConcurso.jsx",
// como podria implementar un componente EditarConcurso.jsx para editar los datos de un concurso que se ha creado y guardado en la base de datos?:

import { useEffect, useState } from 'react';
import {useConcursoData} from '../../state/useState';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, FormControlLabel, Checkbox, FormGroup, Container } from '@mui/material';
import theme from '../../components/Temas/theme';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import EditarConcurso from './EditarConcurso'
import { apiService } from '../../api/apiService';
import { Global } from '@emotion/react';
import FormularioConcurso from './FormularioConcurso';

const CrearConcurso = () => {
	const localhost = 'desarrollodtic.pol.una.py';

	const navigate = useNavigate();
	const [errorMessages, setErrorMessages] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
	//obtener el anho
	const anhoActual = new Date().getFullYear();
	const [selectedAnho, setSelectedAnho] = useState(anhoActual);
	const [concursoId, setConcursoId] = useState(null);
	const [selectedCodigoConcurso, setSelectedCodigoConcurso] = useState('');
	const [selectedEstadoSeguimientoConcurso, setSelectedEstadoSeguimientoConcurso] = useState('');
	// const [selectedInformacion, setSelectedInformacion] = useState('');
	const [selectedDenominacionConcurso, setSelectedDenominacionConcurso] = useState('');
  	const [selectedConcurso, setSelectedConcurso] = useState('');
    const [selectedModalidad, setSelectedModalidad] = useState('');
    const [tipoConcurso, setTipoConcurso] = useState(['---']); 
    const [modalidadConcurso, setModalidadConcurso] = useState(['---']);
    const [selectedVigenciaDesde, setSelectedVigenciaDesde] = useState(today);
    const [selectedVigenciaHasta, setSelectedVigenciaHasta] = useState(today);
    const [estadoConcurso, setEstadoConcurso] = useState(true); //por defecto el estado del concurso es true
    const [esArancelado, setEsArancelado] = useState(false);
    const [esPostulacionMultiple, setEsPostulacionMultiple]  = useState(false);
	const [datoConcurso, setDatoConcurso] = useState({
		"anho_concurso": null,
		"codigo_concurso": "",
		"estado_seguimiento_concurso": "",
		"estado_concurso": false,
		"es_arancelado": false,
		"vigencia_desde": null,
		"vigencia_hasta": null,
		"denominacion_conc": "",
		"es_postulacion_multiple": false,
		"tipo_concurso": null,
		"modalidad_concurso": null,
		"info": null
	})

    const handleCheckboxEstadoConcursoChange = (event) => {
      setEstadoConcurso(event.target.checked);
    };

    const handleCheckboxEsAranceladoChange = (event) => {
      setEsArancelado(event.target.checked);
    };

    const handleCheckboxEsPostulacionMultipleChange = (event) => {
      setEsPostulacionMultiple(event.target.checked);
    }


	// useEffect(() => { 
	// 	fetch('http://127.0.0.1:8000/concurso/tipoconcurso/')
	// 	.then(response => response.json())
	// 	.then(data	=> {
	// 		setTipoConcurso(data);
	// 		console.log(tipoConcurso);
	// 	})
	// 	.catch(error => {
	// 		console.error('Error al obtener los tipos de concurso:', error);
	// 	});
	// }, []);
	useEffect(() => {
		const obtenerTiposConcursos = async () => {
			try {
				const data = await apiService.get(`http://${localhost}:8000/concurso/tipoconcurso/`);
				setTipoConcurso(data);	
			} catch (error) {
				console.error('Error al obtener los tipos de concurso:', error);
			}
		};
		obtenerTiposConcursos();
	}, []);

	// useEffect(() => {
	// 	fetch('http://127.0.0.1:8000/concurso/modalidadconcurso/')
	// 	.then(response => response.json())
	// 	.then(data	=> {
	// 		setModalidadConcurso(data);
	// 	})
	// 	.catch(error => {
	// 		console.error('Error al obtener las modalidades de concurso:', error);
	// 	});
		
	// }, []);

	useEffect(() => {
		const obtenerModalidadesConcursos = async () => {
			try {
				const data = await apiService.get(`http://${localhost}:8000/concurso/modalidadconcurso/`);
				setModalidadConcurso(data);
			} catch (error) {
				console.error('Error al obtener las modalidades de concurso:', error);
			}
		};

		obtenerModalidadesConcursos();

	}, []);
  
	const guardarConcurso = () => {

		// const codigoConcurso = `${selectedDenominacionConcurso.slice(0, 1)}${selectedConcurso.slice(0, 2)}${selectedModalidad.slice(0, 2)}${selectedVigenciaDesde.slice(5, 7)}${selectedAnho.slice(2, 4)}`;

		// setSelectedCodigoConcurso(codigoConcurso);


		const concurso = {
			"anho_concurso": selectedAnho,
			"codigo_concurso": selectedCodigoConcurso,
			"estado_seguimiento_concurso": selectedEstadoSeguimientoConcurso,
			"denominacion_conc": selectedDenominacionConcurso,
			"vigencia_desde": selectedVigenciaDesde, 
			"vigencia_hasta": selectedVigenciaHasta,
			"tipo_concurso": tipoConcurso.find(tipo => tipo.descripcion_tipo_concurso === selectedConcurso).tipo_concurso_id,
    		"modalidad_concurso": modalidadConcurso.find(modalidad => modalidad.descripcion_modalidad_concurso === selectedModalidad).modalidad_concurso_id,
			"estado_concurso": estadoConcurso,
			"es_arancelado": esArancelado, 
			"es_postulacion_multiple": esPostulacionMultiple,
			//"info": selectedInformacion
		};
		setDatoConcurso(concurso);
		console.log(datoConcurso);
		console.log(selectedConcurso.tipo_concurso_id);
		fetch(`http://${localhost}:8000/concurso/concurso/`, {
			method: 'POST',
		 	headers: {
		 		'Content-Type': 'application/json',
		 	},
		 	body: JSON.stringify(concurso),
		 })
		 	.then(response => response.json())
		 	.then(data => {
		 		console.log(data);
				//navega a la pagina de concurso_creado
				//history.push(`/concurso_creado/${data.concurso_id}`);
				//history.push('/concurso_creado/');
				// navega a la pagina de concurso_creado con todos los datos del formulario como parametros de consulta
				// const queryParams = Object.entries(concurso)
				// .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
				// .join('&');
				// navigate(`/requisitos_concurso?${queryParams}`);
				setConcursoId(data.concurso_id);
				//navega a la pagina de agregar_requisitos_concurso
				//navigate('/concurso_docente/agregar_requisitos_concurso/');
				navigate('/concurso_docente/agregar_requisitos_concurso/', { state: { concursoId: data.concurso_id } });
		 	})
		 	.catch(error => { 
		 		console.error('Error al guardar el concurso:', error);
		 	});
	};


    const inputText = [
		{
      id: "Denominacion concurso",
      label: "Denominacion concurso",
			valor: selectedDenominacionConcurso,
            type: 'text',
			handleChange: (event) => {
				setSelectedDenominacionConcurso(event.target.value);
			},
			width: 11.7,
    },
		{
			id: "Codigo Concurso",
		 	label: "Codigo Concurso",
		  valor: selectedCodigoConcurso,
		  type: 'text',
		  handleChange: (event) => {
			  setSelectedCodigoConcurso(event.target.value);
		  },
		  width: 5.5,
	 	},
		{
      id:"Año",
      label:"Año Concurso",
			valor: selectedAnho, 
			type: 'text',
			handleChange: (event) => {
				setSelectedAnho(event.target.value);
				if (parseInt(event.target.value) < new Date().getFullYear()){
					setErrorMessages({
						...errorMessages,
						"Anho" : "El año no debe ser menor al año actual"
					});
				}else {
					setErrorMessages({
						...errorMessages,
						"Anho" : ""
					});
				}
			},
			width: 5.5,
        },
        {
            id: "Tipo Concurso",
            label: "Tipo Concurso",
            valor: selectedConcurso,
            type: 'select',
            options: tipoConcurso.map(tipo => tipo.descripcion_tipo_concurso),
            handleChange: (event) => {
                setSelectedConcurso(event.target.value);
                //handleTipoConcursoChange(event);
            },
			width: 5.5,
        },
        {
            id: "Modalidad Concurso",
            label: "Modalidad Concurso",
            valor: selectedModalidad,
            type: 'select',
            options: modalidadConcurso.map(modalidad => modalidad.descripcion_modalidad_concurso),
            handleChange: (event) => {
                setSelectedModalidad(event.target.value);
                //handleModalidadConcursoChange(event);
            },
			width: 5.5,
        },
		{
			id: "Vigencia desde",
			label: "Vigencia desde",
			valor: selectedVigenciaDesde,
			type: 'date',
			handleChange: (event) => {
				setSelectedVigenciaDesde(event.target.value);
			  if (new Date(event.target.value) < new Date(today)) {
				setErrorMessages({
					...errorMessages,
					"VigenciaDesde": "La fecha 'vigente desde' NO puede ser menor a la fecha actual"});
			  	} else if (new Date(event.target.value) > new Date(selectedVigenciaHasta)) {
					setErrorMessages({
						...errorMessages,
						"VigenciaDesde": "La fecha 'vigente desde' NO puede ser mayor a la fecha 'vigente hasta'"
					});
				} else {
				setErrorMessages({
					...errorMessages,
					"VigenciaDesde": ""
				});
			   }
			},
			width: 5.5,
		},
		{
			id: "Vigencia hasta",
			label: "Vigencia hasta",
			valor: selectedVigenciaHasta,
			type: 'date',
			handleChange: (event) => {
				setSelectedVigenciaHasta(event.target.value);
				
				if (new Date(event.target.value) < new Date(selectedVigenciaDesde)) {
					setErrorMessages({
					 ...errorMessages,
					 "VigenciaHasta": "La fecha 'vigente hasta' NO puede ser menor a la fecha 'vigente desde'"
					});
				   } else {
					setErrorMessages({
					 ...errorMessages,
					 "VigenciaHasta": ""
					});
					
				}
			},
			width: 5.5,
		},
		{
			id:"Es arancelado",
			type: 'checkbox',
			label: "Arancelado",
			valor: esArancelado,
			handleChange: (event) => {
				setEsArancelado(event.target.checked);
				console.log('hola');
			},
			width: 5.5,
		},
		{
			id: "Es postulacion multiple",
			type: 'checkbox',
			label: "Postulacion multiple",
			valor: esPostulacionMultiple,
			handleChange: (event) => {
				setEsPostulacionMultiple(event.target.checked);
			},
			width: 5.5,
		},
    ];
    
	const obtenerFormularioConcurso = () => {
		return (
			<FormularioConcurso inputText = {inputText} />	
			);
		};
  
    return (
		<Grid item container 
			justifyContent="space-between"
			alignItems="center"
			xs={11}
			sx={{
				display: 'flex',
				//border: 4,
				m: 'auto',
				borderRadius: 2,
				borderStyle: "double",
				boxShadow: 4,
				borderColor: "primary.dark",
				backgroundColor: 'primary.contrastText',
				position:'relative',
				flexDirection: 'row',
				//flexWrap: 'wrap',
				//gap: 1.5,
				
			}}>  
		
		<Typography
          variant="h2"
          textAlign= "center"
          color="primary.main"
          fontWeight= "bold"
          marginTop={2}
					marginBottom={2}
		  		mx='auto'
        > 
          Nuevo Concurso
        </Typography> 

		{obtenerFormularioConcurso()}

			<Button size="small" variant="contained" color="primary" 
					sx={{
						fontSize: theme.typography.body1, // Ajusta el tamaño de la letra según tus necesidades
						fontWeight: 'bold',
						width: '15%',
						alignSelf: 'center',
						marginBottom: 2,
						mx:'auto'
						}}
						onClick={guardarConcurso}
						>
							Crear
				</Button>
		</Grid> 
		
    );
};
export default CrearConcurso;

{/*item.type === 'select' ?*/} 