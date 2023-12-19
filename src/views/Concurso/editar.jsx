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

// useEffect(() => {
// 	const prevConcursoId = concursoId;
// 	fetch(`http://127.0.0.1:8000/concurso/concurso/${concursoId}`)
// 	  .then(response => response.json())
// 	  .then(data => {
// 		// Verifica si el valor de concursoId ha cambiado antes de actualizar el estado
// 	  if (prevConcursoId === concursoId) {
// 		setDatoConcurso(data);  // Almacena los puestos en el estado
// 		console.log(data);
		
// 	  }
// 	  })
// 	  .catch(error => {
// 		console.error('Error al obtener el concurso', error);
// 	  });
//   }, [concursoId]);


import { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import theme from "../../components/Temas/theme";
import { apiService } from '../../api/apiService';


const editar = () => {
    const concursoId = 9;
	//const today = new Date(2023, 11, 24);
	// const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
	// const opciones = {day: '2-digit', month: '2-digit', year: 'numeric'};
	const today = new Date().toISOString().slice(0, 10);
	console.log(today);
    // const [estados, setEstados] = useState({
    //     "anho_concurso": "2023",
    //     "codigo_concurso": "ASUNCION-2023-1",
    //     "estado_seguimiento_concurso": "INICIO",
    //     "estado_concurso": "TRUE",
    //     "es_arancelado": "TRUE",
    //     "vigencia_desde": today,
    //     "vigencia_hasta": today,
    //     "denominacion_conc": "CONCURSO EXTERNO",
    //     "es_postulacion_multiple": "FALSE",
    //     "tipo_concurso": "MODERADO",
    //     "modalidad_concurso": "PRESENCIAL",
    // });
	const [estados, setEstados] = useState({
		"anho_concurso": "",
		"codigo_concurso": "",
		"estado_seguimiento_concurso": "",
		"estado_concurso": "",
		"es_arancelado": "",
		"vigencia_desde": "",
		"vigencia_hasta": "",
		"denominacion_conc": "",
		"es_postulacion_multiple": "",
		"tipo_concurso": "",
		"modalidad_concurso": "",
	});
    const [errorMessages, setErrorMessages] = useState({});// Almacena los mensajes de error de los campos de texto
    //const [inputText, setInputText] = useState([]); // Almacena los campos de texto
	const [tipoConcurso, setTipoConcurso] = useState(['---']); 
    const [modalidadConcurso, setModalidadConcurso] = useState(['---']);

    const [datoConcurso, setDatoConcurso] = useState(
        {
            "anho_concurso": "",
            "codigo_concurso": "",
            "estado_seguimiento_concurso": "",
            "estado_concurso": "",
            "es_arancelado": "",
            "vigencia_desde": "",
            "vigencia_hasta": "",
            "denominacion_conc": "",
            "es_postulacion_multiple": "",
            "tipo_concurso": "",
            "modalidad_concurso": "",
        }
    );
    
	// useEffect(() => {
	// 	const prevConcursoId = concursoId;
	// 	fetch(`http://127.0.0.1:8000/concurso/concurso/${concursoId}`)
	// 	  .then(response => response.json())
	// 	  .then(data => {
	// 		// Verifica si el valor de concursoId ha cambiado antes de actualizar el estado
	// 	  if (prevConcursoId === concursoId) {
	// 		setDatoConcurso(data);  // Almacena los puestos en el estado
	// 		console.log(data);
			
	// 	  }
	// 	  })
	// 	  .catch(error => {
	// 		console.error('Error al obtener el concurso', error);
	// 	  });
	//   }, [concursoId]);

	
	useEffect(() => {
		const obtenerConcurso = async () => {
			try {
				const data = await apiService.get(`http://127.0.0.1:8000/concurso/concurso/${concursoId}`);
				setDatoConcurso(data);
				setEstados(data);
				console.log(data);
			} catch (error) {
				console.error('Error al obtener el concurso', error);
			}
		};
		obtenerConcurso();
	}, [concursoId]);

	useEffect(() => {
		const obtenerTiposConcursos = async () => {
			try {
				const data = await apiService.get('http://127.0.0.1:8000/concurso/tipoconcurso/');
				setTipoConcurso(data);
				//setTipoConcurso(await data.json());
				console.log(data);	
			} catch (error) {
				console.error('Error al obtener los tipos de concurso:', error);
			}
		};
		obtenerTiposConcursos();
	}, []);

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
  
		

    const inputText = [
        {
            id:"Año",
            label:"Año Concurso",
			valor: estados.anho_concurso,//datoConcurso.anho_concurso, 
			type: 'text',
            width: 5.3,
            // handleChange: (event) => {
            //     setDatoConcurso(prevState => ({
            //       ...prevState,
            //       anho_concurso: event.target.value
            //     }));
            // }
            handleChange: (event) => {
                const nuevoAnho = event.target.value;
                const anhoActual = new Date().getFullYear();
                if (parseInt(nuevoAnho) < anhoActual) {
                    setErrorMessages({
                        ...errorMessages,
                        "Anho": "El año del concurso NO puede ser menor al año actual"
                    });
                } else {
                    setErrorMessages({
                        ...errorMessages,
                        "Anho": ""
                    });
                   
                }  
               
                setEstados(prevState => ({
                    ...prevState,
                    anho_concurso: nuevoAnho,
                  }));
                  
                console.log(estados.anho_concurso);
            },
        },
		{
			id: "Codigo Concurso",
		 	label: "Codigo Concurso",
		    valor: estados.codigo_concurso,//datoConcurso.codigo_concurso,
		    type: 'text',
			handleChange: (event) => {
				const nuevoCodigoConcurso = event.target.value;
				setEstados(prevState => ({
					...prevState,
						codigo_concurso: nuevoCodigoConcurso,
				}));
			},
	 	},
	 	{
	      	id: "Estado seguimiento concurso",
			label: "Estado seguimiento concurso",
			valor: estados.estado_seguimiento_concurso,//datoConcurso.estado_seguimiento_concurso,
			type: 'text',
			handleChange: (event) => {
				const nuevoEstadoSegConcurso = event.target.value;

				setEstados(prevState => ({
					...prevState,
						estado_seguimiento_concurso: nuevoEstadoSegConcurso,
				}));
			},
	 	},
	 
	 	{
			id: "Vigencia",
			labelDesde: "Vigencia desde",
			labelHasta: "Vigencia hasta",
			valorDesde: estados.vigencia_desde,//datoConcurso.vigencia_desde,
			valorHasta: estados.vigencia_hasta,//datoConcurso.vigencia_hasta,
			type: 'date',
			handleChangeDesde: (event) => {
				const vigenciaDesde = event.target.value;
				//const vigenciaHasta = document.getElementById("VigenciaHasta").value;
				console.log(vigenciaDesde);
				console.log(new Date(vigenciaDesde));
				if (vigenciaDesde < estados.vigencia_desde) {
					setErrorMessages({
						...errorMessages,
						"VigenciaDesde": "La fecha 'vigente desde' NO puede ser menor a la fecha actual"});
				} else {
					setErrorMessages({
						...errorMessages,
						"VigenciaDesde": ""
					});
				}
				
				setEstados(prevState => ({
					...prevState,
						vigencia_desde: vigenciaDesde,
				}));
			},
			handleChangeHasta: (event) => {
				const vigenciaHasta = event.target.value;
				
				if (vigenciaHasta < estados.vigencia_desde) {
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
				
				setEstados(prevState => ({
					...prevState,
						vigencia_hasta: vigenciaHasta,
				}));
			},
	 	},
		{
            id: "Denominacion concurso",
            label: "Denominacion concurso",
			valor: estados.denominacion_conc,//datoConcurso.denominacion_conc,
            type: 'text',
			handleChange: (event) => {
				const nuevaDenominConcurso = event.target.value;

				setEstados(prevState => ({
					...prevState,
						denominacion_conc: nuevaDenominConcurso,
				}));
			},
        },
        {
            id: "Tipo Concurso",
            label: "Tipo Concurso",
			valor: ((tipoConcurso.find(tipo => tipo.tipo_concurso_id === estados.tipo_concurso)) || {}).descripcion_tipo_concurso,
			//valor: tipoConcurso.find(tipo => tipo.tipo_concurso_id === estados.tipo_concurso).descripcion_tipo_concurso,
			//valor: tipoConcurso.find(tipo => tipo.tipo_concurso_id === estados.tipo_concurso).descripcion_tipo_concurso,//datoConcurso.tipo_concurso,)
            //valor: estados.tipo_concurso,//datoConcurso.tipo_concurso,
            type: 'select',
            options: tipoConcurso.map(tipo => tipo.descripcion_tipo_concurso),
            handleChange: (event) => {
                const nuevoTipoConcurso = event.target.value;
                
				setEstados(prevState => ({
					...prevState,
						tipo_concurso: nuevoTipoConcurso,
				}));
            },
        },
        {
            id: "Modalidad Concurso",
            label: "Modalidad Concurso",
            valor: estados.modalidad_concurso,//datoConcurso.modalidad_concurso,
            type: 'select',
            options: modalidadConcurso.map(modalidad => modalidad.descripcion_modalidad_concurso),
            handleChange: (event) => {
                const nuevaModalidadConcurso = event.target.value;
                
				setEstados(prevState => ({
					...prevState,
						modalidad_concurso: nuevaModalidadConcurso,
				}));
            },
        },
        
		
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
			{item.type === 'date' ? (
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
						// '& .MuiOutlinedInput-root': {
						// 	'& fieldset': {
						// 	  borderColor: errorMessages["VigenciaHasta"] !== "" ? 'red' : 'inherit',
						// 	},
						// 	'&:hover fieldset': {
						// 	  borderColor: errorMessages["VigenciaHasta"] !== "" ? 'red' : 'inherit',
						// 	},
						// 	'&.Mui-focused fieldset': {
						// 	  borderColor: errorMessages["VigenciaHasta"] !== "" ? 'red' : 'inherit',
						// 	},
						// },
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
						
			)}
			</Grid>
		))}

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
};

export default editar;