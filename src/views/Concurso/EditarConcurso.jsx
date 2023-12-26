// estoy intentando implementar el componente EditarConcurso.jsx, y al intentar recuperar los datos de la base de datos creo que tengo problemas de logica o de sintaxis, puedes ayudarme a solucinarlo? acontinuacion esta mi codigo:

// cuando intento recuperar los datos de la base de datos para mostrarlos en el formulario de edicion de concurso, no me recupera nada, acontinuacion 
// tengo implementado mi componente EditarConcurso.jsx de la siguiente manera:

import { useEffect, useState } from 'react';
import { useConcursoData } from '../../state/useState';
import theme from '../../components/Temas/theme';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, FormControlLabel, Checkbox, FormGroup, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
//import { useConcursoData } from '../../state/useState';

const EditarConcurso = () => {
    // const { concursoData } = useConcursoData();
    // const concursoId = concursoData.concurso_id;
	//const { concurso_id } = useParams();
	const { concursoData } = useConcursoData();
	const concursoId = 9;
    const [concurso, setConcurso] = useState([]);
	const [errorMessages, setErrorMessages] = useState([]);
  	const today = new Date().toISOString().slice(0, 10);
	const [selectedAnho, setSelectedAnho] = useState('');
	const [selectedCodigoConcurso, setSelectedCodigoConcurso] = useState('');
	const [selectedEstadoSeguimientoConcurso, setSelectedEstadoSeguimientoConcurso] = useState('');
	const [selectedInformacion, setSelectedInformacion] = useState('');
	const [selectedDenominacionConcurso, setSelectedDenominacionConcurso] = useState('');
	const [selectedTipoConcurso, setSelectedTipoConcurso] = useState('');
	const [selectedModalidad, setSelectedModalidad] = useState('');
    const [tipoConcurso, setTipoConcurso] = useState(['---']); 
    const [modalidadConcurso, setModalidadConcurso] = useState(['---']);
    const [selectedVigenciaDesde, setSelectedVigenciaDesde] = useState('');
    const [selectedVigenciaHasta, setSelectedVigenciaHasta] = useState('');
    const [estadoConcurso, setEstadoConcurso] = useState(false);
    const [esArancelado, setEsArancelado] = useState(false);
    const [esPostulacionMultiple, setEsPostulacionMultiple]  = useState(false);
	const [datoConcurso, setDatoConcurso] = useState('');
	// const [datoConcurso, setDatoConcurso] = useState({
	// 	"anho_concurso": null,
	// 	"codigo_concurso": "",
	// 	"estado_seguimiento_concurso": "",
	// 	"estado_concurso": false,
	// 	"es_arancelado": false,
	// 	"vigencia_desde": null,
	// 	"vigencia_hasta": null,
	// 	"denominacion_conc": "",
	// 	"es_postulacion_multiple": false,
	// 	"tipo_concurso": null,
	// 	"modalidad_concurso": null,
	// 	"info": null
	// })

	useEffect(() => {
		const prevConcursoId = concursoId;
		fetch(`http://127.0.0.1:8000/concurso/concurso/${concursoId}`)
		  .then(response => response.json())
		  .then(data => {
			// Verifica si el valor de concursoId ha cambiado antes de actualizar el estado
		  if (prevConcursoId === concursoId) {
			setDatoConcurso(data);  // Almacena los puestos en el estado
			console.log(data);
			// console.log(data.concurso_id);
		
			// console.log(data.modalidad_concurso);
			// setSelectedAnho(data.anho_concurso),
			// console.log(data.anho_concurso),
			// setSelectedCodigoConcurso(data.codigo_concurso),
			// setSelectedEstadoSeguimientoConcurso(data.estado_seguimiento_concurso);
			// //setSelectedInformacion(data.info);
			// setSelectedDenominacionConcurso(data.denominacion_conc);
			// setSelectedVigenciaDesde(data.vigencia_desde);
			// console.log(data.vigencia_desde);
			// setSelectedVigenciaHasta(data.vigencia_hasta);
			// setEstadoConcurso(data.estado_concurso);
			// setEsArancelado(data.es_arancelado);
			// setEsPostulacionMultiple(data.es_postulacion_multiple);
			// // setSelectedModalidad(modalidadConcurso.find(modalidad => modalidad.descripcion_modalidad_concurso === data.modalidad_concurso_id).descripcion_modalidad_concurso);
			// // setSelectedModalidad(modalidadConcurso.find((modalidad) => modalidad.id === data.modalidad_concurso).descripcion_modalidad_concurso);
			// // console.log(selectedModalidad);
			
			
	 		// // setSelectedConcurso(tipoConcurso.find((tipo) => tipo.id ===  data.tipo_concurso).descripcion_tipo_concurso);
			// // console.log(data.tipo_concurso);
			// // console.log(selectedConcurso);

			// setSelectedTipoConcurso(tipoConcurso.find(tipo => tipo.tipo_concurso_id === data.tipo_concurso).descripcion_tipo_concurso);
			// console.log(selectedTipoConcurso);

		  }
		  })
		  .catch(error => {
			console.error('Error al obtener el concurso', error);
		  });
	  }, [concursoId]);

	// useEffect(() => {
	// 	const fetchConcurso = async () => {
	// 	  const response = await fetch(`http://127.0.0.1:8000/concurso/concurso/?concurso_id=${concursoId}`);
	// 	  const data = await response.json();
	// 	  setDatoConcurso(data);
	// 	  //	console.log(concursoId);
	// 	  console.log(data);
	// 	  console.log(data.denominacion_conc);
	// 	//   {data.map((item) => (
	// 	// 	item.concurso_id === 9 ? (
	// 	// 		setSelectedAnho(item.anho_concurso),
	// 	// 		setSelectedDenominacionConcurso(item.denominacion_conc),
				
	// 	// 		setSelectedModalidad(modalidadConcurso.find((modalidad) => modalidad.id === item.modalidad_concurso_id).descripcion_modalidad_concurso),

	// 	// 		console.log(selectedModalidad),
	// 	// 		setSelectedConcurso(tipoConcurso.find((tipo) => tipo.id ===  item.tipo_concurso_id).descripcion_tipo_concurso),
	// 	// 		console.log("si hay concurso", item.concurso_id, item.codigo_concurso)
	// 	// 	) : console.log("no hay concurso con id 9")
	// 	//   ))}
	// 	  //setConcurso(data);
	// 	//   if(data.concurso_id === 9){
	// 	// 	console.log(data.concurso_id);
	// 	//   setSelectedAnho(data.anho_concurso);
	// 	//   setSelectedCodigoConcurso(data.codigo_concurso);
	// 	//   setSelectedEstadoSeguimientoConcurso(data.estado_seguimiento_concurso);
	// 	//   setSelectedInformacion(data.info);
	// 	//   setSelectedDenominacionConcurso(data.denominacion_conc);
	// 	//   setSelectedVigenciaDesde(data.vigencia_desde);
	// 	//   setSelectedVigenciaHasta(data.vigencia_hasta);
	// 	//   setEstadoConcurso(data.estado_concurso);
	// 	//   setEsArancelado(data.es_arancelado);
	// 	//   setEsPostulacionMultiple(data.es_postulacion_multiple);
	// 	// //   setSelectedConcurso(tipoConcurso.find(tipo=> tipo.descripcion_tipo_concurso === data.tipo_concurso_id).descripcion_tipo_concurso);
	// 	// //   setSelectedModalidad(modalidadConcurso.find(modalidad => modalidad.descripcion_modalidad_concurso === data.modalidad_concurso_id).descripcion_modalidad_concurso);
	// 	//   if (data.tipo_concurso_id) {
	// 	// 	setSelectedConcurso(tipoConcurso.find(tipo=> tipo.descripcion_tipo_concurso === data.tipo_concurso_id).descripcion_tipo_concurso);
	// 	// 	console.log(data.tipo_concurso_id);
	// 	//   }
	// 	//   if (data.modalidad_concurso_id) {
	// 	// 	setSelectedModalidad(modalidadConcurso.find(modalidad => modalidad.descripcion_modalidad_concurso === data.modalidad_concurso_id).descripcion_modalidad_concurso);
	// 	//   }
	// 	// }else{
	// 	// 	console.log("no hay concurso");
	// 	// }
	// 	};
	// 	fetchConcurso();
	// }, []);
	   
	// const handleCheckboxEstadoConcursoChange = (event) => {
	// 	setEstadoConcurso(event.target.checked);
	//   };
  
	//   const handleCheckboxEsAranceladoChange = (event) => {
	// 	setEsArancelado(event.target.checked);
	//   };
  
	//   const handleCheckboxEsPostulacionMultipleChange = (event) => {
	// 	setEsPostulacionMultiple(event.target.checked);
	//   }
  
  
	//   useEffect(() => { 
	// 	  fetch('http://127.0.0.1:8000/concurso/tipoconcurso/')
	// 	  .then(response => response.json())
	// 	  .then(data	=> {
	// 		  setTipoConcurso(data);
	// 		  //console.log(tipoConcurso);
	// 	  })
	// 	  .catch(error => {
	// 		  console.error('Error al obtener los tipos de concurso:', error);
	// 	  });
	//   }, []);
  
	//   useEffect(() => {
	// 	  fetch('http://127.0.0.1:8000/concurso/modalidadconcurso/')
	// 	  .then(response => response.json())
	// 	  .then(data	=> {
	// 		  setModalidadConcurso(data);
	// 	  })
	// 	  .catch(error => {
	// 		  console.error('Error al obtener las modalidades de concurso:', error);
	// 	  });
		  
	//   }, []);

	// const [selectedConcurso, setSelectedConcurso] = useState({tipoConcurso.find(tipo=> tipo.descripcion_tipo_concurso === concurso.tipo_concurso_id).descripcion_tipo_concurso});
    // const [selectedModalidad, setSelectedModalidad] = useState({modalidadConcurso.find(modalidad => modalidad.descripcion_modalidad_concurso === concurso.modalidad_concurso_id).descripcion_modalidad_concurso});
    // useEffect(() => {
    //     const prevConcursoId = concursoId;
    //     fetch(`http://127.0.0.1:8000/concurso/concurso/?concurso_id=${concursoId}`)
    //       .then(response => response.json())
    //       .then(data => {
    //         // Verifica si el valor de concursoId ha cambiado antes de actualizar el estado
    //       if (prevConcursoId === concursoId) {
    //         setConcurso(data);  // Almacena los puestos en el estado
    //       }
    //       })
    //       .catch(error => {
    //         console.error('Error al obtener el concurso:', error);
    //       });
    // }, [concursoId]);
	// const editarConcurso = () => {
	// 	fetch(`http://127.0.0.1:8000/concurso/concurso/${concursoId}`, {
	// 	  method: 'PUT',
	// 	  headers: {
	// 		'Content-Type': 'application/json',
	// 	  },
	// 	  body: JSON.stringify(datoConcurso),
	// 	})
	// 	.then(response => response.json())
	// 	.then(data => {
	// 	  console.log(data);
	// 	  //navigate(`/concurso_editado/${data.concurso_id}`);
	// 	})
	// 	.catch(error => { 
	// 	  console.error('Error al editar el concurso:', error);
	// 	});
	// };
	   


    const inputText = [
        {
            id:"Año",
            label:"Año Concurso",
			valor: 2023,//datoConcurso.anho_concurso, 
			type: 'text',
			// handleChange: (event) => {
			// 	setSelectedAnho(event.target.value);
			// 	if (parseInt(event.target.value) < new Date().getFullYear()){
			// 		setErrorMessages({
			// 			...errorMessages,
			// 			"Anho" : "El año no debe ser menor al año actual"
			// 		});
			// 	}else {
			// 		setErrorMessages({
			// 			...errorMessages,
			// 			"Anho" : ""
			// 		});
			// 	}
			// },
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
		// {
		// 	id: "Vigencia",
		// 	labelDesde: "Vigencia desde",
		// 	labelHasta: "Vigencia hasta",
		// 	valorDesde: selectedVigenciaDesde,
		// 	valorHasta: selectedVigenciaHasta,
		// 	type: 'date',
		// 	handleChangeDesde: (event) => {
		// 	  setSelectedVigenciaDesde(event.target.value);
		// 	  if (new Date(event.target.value) < new Date(today)) {
		// 		setErrorMessages({
		// 			...errorMessages,
		// 			"VigenciaDesde": "La fecha 'vigente desde' NO puede ser menor a la fecha actual"});
		// 	  	} else if (new Date(event.target.value) > new Date(concurso.vigencia_hasta)) {
		// 			setErrorMessages({
		// 				...errorMessages,
		// 				"VigenciaDesde": "La fecha 'vigente desde' NO puede ser mayor a la fecha 'vigente hasta'"
		// 			});
		// 		} else {
		// 		setErrorMessages({
		// 			...errorMessages,
		// 			"VigenciaDesde": ""
		// 		});
		// 	   }

		// 	},
		// 	handleChangeHasta: (event) => {
		// 		setSelectedVigenciaHasta(event.target.value);
				
		// 		if (new Date(event.target.value) < new Date(concurso.vigencia_desde)) {
		// 			setErrorMessages({
		// 			 ...errorMessages,
		// 			 "VigenciaHasta": "La fecha 'vigente hasta' NO puede ser menor a la fecha 'vigente desde'"
		// 			});
		// 		   } else {
		// 			setErrorMessages({
		// 			 ...errorMessages,
		// 			 "VigenciaHasta": ""
		// 			});
					
		// 		}
		// 	},
		// },
		
		// {
        //     id: "Denominacion concurso",
        //     label: "Denominacion concurso",
		// 	valor: selectedDenominacionConcurso,
        //     type: 'text',
		// 	handleChange: (event) => {
		// 		setSelectedDenominacionConcurso(event.target.value);
		// 	}
        // },
        // {
        //     id: "Tipo Concurso",
        //     label: "Tipo Concurso",
        //     valor: selectedTipoConcurso,
        //     type: 'select',
        //     options:tipoConcurso.map((tipo) => ({
		// 		label: tipo.descripcion_tipo_concurso,
		// 		value: tipo.id_tipo_concurso,
		// 	  })),
        //     handleChange: (event) => {
        //         setSelectedTipoConcurso(event.target.value);
		// 		console.log(selectedTipoConcurso);
        //         //handleTipoConcursoChange(event);
        //     },
        // },
        // {
        //     id: "Modalidad Concurso",
        //     label: "Modalidad Concurso",
        //     valor: selectedModalidad,
        //     type: 'select',
        //     options: modalidadConcurso.map(modalidad => modalidad.descripcion_modalidad_concurso),
        //     handleChange: (event) => {
        //         setSelectedModalidad(event.target.value);
        //         //handleModalidadConcursoChange(event);
        //     },
        // },
		// {
		// 	id: "Informacion",
		//  	label: "Informacion",
		//  	valor: selectedInformacion,
		//  	type: 'text',
		//  	handleChange: (event) => {
		//  		setSelectedInformacion(event.target.value);
		// 	}
		// },
        
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
					Editar Concurso
			</Typography>
		
		{inputText.map((item) => (
			<Grid item key={item.id}>
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
						
			)
			</Grid>
		))}

		{/* <Grid container direction="row" alignItems="flex-start">
			<Grid item xs={4}>
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
			</Grid>
			<Grid item xs={4}>
				<FormControlLabel 
					control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } ,
					color: theme.palette.primary.main,
					'&.Mui-checked': {
					color: theme.palette.info.main,
					},
					}}
				esArancelado={esArancelado} onChange={handleCheckboxEsAranceladoChange} />}
					label="Es Arancelado"
					labelPlacement="start"
					style={{
						textAlign: "left", 
						fontSize: 30
					}}
					disableRipple
					required
				/>
			</Grid>
			<Grid item xs={4}>
				<FormControlLabel
					control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 },
					color: theme.palette.primary.main,
					'&.Mui-checked': {
					color: theme.palette.info.main,
					},

					}} 
					esPostulacionMultiple={esPostulacionMultiple} 
					onChange={handleCheckboxEsPostulacionMultipleChange} />}
					label="Es Postulacion Multiple"
					labelPlacement="start"
					style={{textAlign: "left", fontSize: 30}}
					disableRipple
					required
					//classes={neonStyles}
				/>
			</Grid>
		</Grid> */}


			<Button size="small" variant="contained" color="primary" 
				sx={{
					fontSize: theme.typography.body1, // Ajusta el tamaño de la letra según tus necesidades
					fontWeight: 'bold',
					width: '30%',
					alignSelf: 'center',
					marginBottom: 2,
					}}
					//onClick={editarConcurso}
					// onClick={() => handlePostularClick(concurso.concurso_id)}
					>
						Editar
			</Button>
  
    	</Box>
		</Container> 
  
    );
    
}

export default EditarConcurso;
