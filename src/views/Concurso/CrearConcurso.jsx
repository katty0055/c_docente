// al ejecutar el sigueinte codigo me rederige a la pagina "concurso_creado" pero no se guarda los datos que se ingreso en el formulario en la base de datos, como podria solucionar eso en el codigo que tengo a continuacion? :

// a partir del siguiente codigo que tengo en el archivo "CrearConcurso.jsx",
// como podria implementar un componente EditarConcurso.jsx para editar los datos de un concurso que se ha creado y guardado en la base de datos?:

import { useEffect, useState } from 'react';
import {useConcursoData} from '../../state/useState';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, FormControlLabel, Checkbox, FormGroup, Container } from '@mui/material';
import theme from '../../components/Temas/theme';
import { blue } from '@mui/material/colors';
//import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';
import { useNavigate } from 'react-router-dom';
import EditarConcurso from './EditarConcurso'
import { apiService } from '../../api/apiService';

const CrearConcurso = () => {

    //const neonStyles = useNeonCheckboxStyles();
	//const [errorMessage, setErrorMessage] = useState("");
	//const history = useHistory();
	const navigate = useNavigate();
	const [errorMessages, setErrorMessages] = useState([]);
  	const today = new Date().toISOString().slice(0, 10);
	//obtener el anho
	const anhoActual = new Date().getFullYear();
	const [selectedAnho, setSelectedAnho] = useState(anhoActual);
	const [selectedCodigoConcurso, setSelectedCodigoConcurso] = useState('');
	const [selectedEstadoSeguimientoConcurso, setSelectedEstadoSeguimientoConcurso] = useState('');
	const [selectedInformacion, setSelectedInformacion] = useState('');
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
				const data = await apiService.get('http://127.0.0.1:8000/concurso/tipoconcurso/');
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
				const data = await apiService.get('http://127.0.0.1:8000/concurso/modalidadconcurso/');
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
		fetch('http://127.0.0.1:8000/concurso/concurso/', {
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
				const queryParams = Object.entries(concurso)
				.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
				.join('&');
				navigate(`/concurso_creado?${queryParams}`);
		 	})
		 	.catch(error => { 
		 		console.error('Error al guardar el concurso:', error);
		 	});
	};


    const inputText = [
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
        },
        {
           	id: "Codigo Concurso",
            label: "Codigo Concurso",
		  	valor: selectedCodigoConcurso,
		  	type: 'text',
		  	handleChange: (event) => {
		  		setSelectedCodigoConcurso(event.target.value);
		  	},
        },
        // {
        //     id: "Estado seguimiento concurso",
        //     label: "Estado seguimiento concurso",
		// 	valor: selectedEstadoSeguimientoConcurso,
        //     type: 'text',
		// 	handleChange: (event) => {
		// 		setSelectedEstadoSeguimientoConcurso(event.target.value);
		// 	},
        // },
		{
			id: "Vigencia",
			labelDesde: "Vigencia desde",
			labelHasta: "Vigencia hasta",
			valorDesde: selectedVigenciaDesde,
			valorHasta: selectedVigenciaHasta,
			type: 'date',
			handleChangeDesde: (event) => {
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
			handleChangeHasta: (event) => {
				setSelectedVigenciaHasta(event.target.value);
				// if (new Date(event.target.value) < new Date(selectedVigenciaDesde)) {
				// 	setErrorMessages({
				// 		...errorMessages,
				// 		"VigenciaHasta": "La fecha 'vigente hasta' NO puede ser menor a la fecha 'vigente desde'"
				// 	});
				// } else if (new Date(event.target.value) === new Date(selectedVigenciaDesde)) {
				// 	setErrorMessages({
				// 		...errorMessages,
				// 		"VigenciaHasta": "La fecha 'vigente hasta' NO puede ser igual a la fecha 'vigente desde'"
				// 	});
				// } else {
				// 	setErrorMessages({
				// 		...errorMessages,
				// 		"VigenciaHasta": ""
				// 	});
				// }

				// 
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
		},
		
		{
            id: "Denominacion concurso",
            label: "Denominacion concurso",
			valor: selectedDenominacionConcurso,
            type: 'text',
			handleChange: (event) => {
				setSelectedDenominacionConcurso(event.target.value);
			}
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
        },
		// {
		// 	id: "Estado Concurso",
		// 	label: "Estado Concurso",
		// 	valor: estadoConcurso,
		// 	type: 'checkbox',
		// 	handleChange: handleCheckboxEstadoConcursoChange,
		//  }
		 
        
    ];
    
  
    return (
		<Container
			sx={{
				display: 'flex',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}>  
			<Box 
				component="form"
				autoComplete="off"
				sx={{
				border: 4,
				width: '80%',
				//height: '100%',
				borderColor: "primary.dark",
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				boxSizing: 'border-box',
				overflow: 'auto',
			}}>
			<Typography
				variant="h1"
				textAlign="center"
				color="primary.main"
				fontWeight="bold"
				style={{marginTop: 8, fontSize: '3vw'}}
			>
					Nuevo Concurso
			</Typography>

		{inputText.map((item) => (
			item.type === 'date' ? (
				<Grid container justifyContent="space-between">
				<Grid item xs={6}>
					<TextField

					id={`${item.id}Desde`}
					label={item.labelDesde}
					type={item.type}
					variant="outlined"
					value={item.valorDesde}
					size={window.innerWidth >= 900 ? "medium" : "small"}
					helperText={errorMessages["VigenciaDesde"]}
					required
					sx={{
						background: theme.palette.primary.contrastText,
						width: '98%',
						marginLeft: 1,
						marginRight: 1,
						'& .MuiFormHelperText-root': {
							color: 'red',
						}
					}}
					onChange={item.handleChangeDesde}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
					id={`${item.id}Hasta`}
					label={item.labelHasta}
					type={item.type}
					variant="outlined"
					value={item.valorHasta}
					size={window.innerWidth >= 900 ? "medium" : "small"}
					helperText={errorMessages["VigenciaHasta"]}
					required
					sx={{
						background: theme.palette.primary.contrastText,
						width: '98%',
						//marginLeft: 1,
						marginRight: 1,
						'& .MuiFormHelperText-root': {
							color: 'red',
						},
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
							  borderColor: errorMessages["VigenciaHasta"] !== "" ? 'red' : 'inherit',
							},
							'&:hover fieldset': {
							  borderColor: errorMessages["VigenciaHasta"] !== "" ? 'red' : 'inherit',
							},
							'&.Mui-focused fieldset': {
							  borderColor: errorMessages["VigenciaHasta"] !== "" ? 'red' : 'inherit',
							},
						},
					}}
					onChange={item.handleChangeHasta}
					/>
				</Grid>
				</Grid>
			) : item.type === 'text' ? (
										<TextField
											id={item.id}
											label={item.label}
											type={item.type}
											variant="outlined"
											value={item.valor}
											size={window.innerWidth >= 900 ? "medium" : "small"}
											required
											helperText={errorMessages[item.id=== "Año" ? "Anho": ""]}
											sx={{
												background: theme.palette.primary.contrastText,
												width: item.id === "Año" ? "30%" : "98%",
												marginLeft: 1,
												marginRight: 1,
											}}
					
											onChange={item.handleChange}
										/>
									
			) : item.type === 'select' && (
					<FormControl>
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
								width: '98%',
								marginLeft: 1,
								marginRight: 1,
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
						
			// ) (item.type === 'checkbox' && (
			// 	<FormControlLabel
			// 		control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
			// 		estadoConcurso={estadoConcurso} onChange={handleCheckboxEstadoConcursoChange} />}
			// 		label="Estado Concurso"
			// 		labelPlacement="start"
			// 		style={{textAlign: "left", fontSize: 30}}
			// 		disableRipple
			// 		required
			// 		/>
			)))}

		<Grid container direction="row" alignItems="flex-start">
			{/* <Grid item xs={4}>
				<FormControlLabel 
					control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30, borderRadius: '60%'},
					color: theme.palette.primary.main,
					'&.Mui-checked': {
					color: theme.palette.info.main,
					},
					}} 
					estadoConcurso={estadoConcurso} onChange={handleCheckboxEstadoConcursoChange} />}
					label="Estado Concurso"
					labelPlacement="start"
					style={{textAlign: "left", fontSize: 30}}
					disableRipple
					required
				/> 
			</Grid>*/}
			<Grid item xs={6}>
				<FormControlLabel 
					control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } ,
					color: theme.palette.primary.main,
					'&.Mui-checked': {
					color: theme.palette.info.main,
					},
					}}
					checked={esArancelado} onChange={handleCheckboxEsAranceladoChange} />}
					label="Es Arancelado"
					labelPlacement="start"
					style={{
						textAlign: "left", 
						fontSize: 30,
						marginLeft: 100,
					}}
					//disableRipple
					required
				/>
			</Grid>
			<Grid item xs={6}>
				<FormControlLabel
					control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 },
					color: theme.palette.primary.main,
					'&.Mui-checked': {
					color: theme.palette.info.main,
					},

					}} 
					checked={esPostulacionMultiple} 
					onChange={handleCheckboxEsPostulacionMultipleChange} />}
					label="Es Postulacion Multiple"
					labelPlacement="start"
					style={{textAlign: "left", fontSize: 30}}
					//disableRipple
					required
					//classes={neonStyles}
				/>
			</Grid>
		</Grid>


			<Button size="small" variant="contained" color="primary" 
				sx={{
					fontSize: theme.typography.body1, // Ajusta el tamaño de la letra según tus necesidades
					fontWeight: 'bold',
					width: '30%',
					alignSelf: 'center',
					marginBottom: 2,
					}}
					onClick={guardarConcurso}
					// onClick={() => handlePostularClick(concurso.concurso_id)}
					>
						Crear
			</Button>
  
    	</Box>
		</Container> 
  
    );
};
export default CrearConcurso;

{/*item.type === 'select' ?*/} 