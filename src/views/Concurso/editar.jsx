import { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import theme from "../../components/Temas/theme";
import { apiService } from '../../api/apiService';
import FormularioConcurso from './FormularioConcurso';


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
			
			width: 5.5,
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
		  width: 5.5,
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
			width: 5.5,
	 	},
        {
            id:"Año",
            label:"Año Concurso",
			valor: estados.anho_concurso,//datoConcurso.anho_concurso, 
			type: 'text',
            //width: 5.3,
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
			width: 5.5,
        },
		{
            id: "Tipo Concurso",
            label: "Tipo Concurso",
			valor: tipoConcurso.length > 0 && estados.tipo_concurso 
			? tipoConcurso.find(tipo => tipo.tipo_concurso_id === estados.tipo_concurso).descripcion_tipo_concurso 
			: "",
			//valor: ((tipoConcurso.find(tipo => tipo.tipo_concurso_id === estados.tipo_concurso)) || {}).descripcion_tipo_concurso,
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
			width: 5.5,
        },
        {
            id: "Modalidad Concurso",
            label: "Modalidad Concurso",
            //valor: estados.modalidad_concurso,//datoConcurso.modalidad_concurso,
			valor: modalidadConcurso.length > 0 && estados.modalidad_concurso
			? modalidadConcurso.find(modalidad => modalidad.modalidad_concurso_id === estados.modalidad_concurso).descripcion_modalidad_concurso : "",
            type: 'select',
            options: modalidadConcurso.map(modalidad => modalidad.descripcion_modalidad_concurso),
            handleChange: (event) => {
                const nuevaModalidadConcurso = event.target.value;
                
				setEstados(prevState => ({
					...prevState,
						modalidad_concurso: nuevaModalidadConcurso,
				}));
            },
			width: 5.5,
        },
	 	

		 {
			id: "Vigencia desde",
			label: "Vigencia desde",
			valor: estados.vigencia_desde,
			type: 'date',
			handleChange: (event) => {
				//setSelectedVigenciaDesde(event.target.value);
				const vigenciaDesde = event.target.value;
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

			   	setEstados(prevState => ({
					...prevState,
					vigencia_desde: vigenciaDesde,
				}));

			},
			width: 5.5,
		},
		{
			id: "Vigencia hasta",
			label: "Vigencia hasta",
			valor: estados.vigencia_hasta,
			type: 'date',
			handleChange: (event) => {
				//setSelectedVigenciaHasta(event.target.value);
				const vigenciaHasta = event.target.value;

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

				setEstados(prevState => ({
					...prevState,
					vigencia_hasta: vigenciaHasta,
				}));

			},
			width: 5.5,
		},
		{
			id:"Es arancelado",
			type: 'checkbox',
			label: "Arancelado",
			valor: estados.es_arancelado,//datoConcurso.es_arancelado
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
			valor: estados.es_postulacion_multiple,//datoConcurso.es_postulacion_multiple,
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
          Editar Concurso
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
						//onClick={editarConcurso}
						>
							Guadar cambios
				</Button>
		</Grid>
	);
};

export default editar;