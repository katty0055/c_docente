import {FormControl, Grid, InputLabel, MenuItem, Select, TextField, FormControlLabel, Checkbox} from '@mui/material';
import theme from '../../components/Temas/theme';
import PropTypes from 'prop-types';


const FormularioConcurso = ({inputText}) => {
    return (
		<Grid  item container 
            //justifyContent="space-around"
            justifyContent={'space-around'}
			alignItems="center"
			
			//columnSpacing={{ xs: 0, sm: 0.5, md:  1}}
			xs={12}
			sx={{
				//display:'flex',
				//flexDirection:'column',  
				//border:4,
				//height: '85%'
			gap: {xs:1, sm:5},
			//rowSpacing:{xs:-2, sm:3, md: 4},
            position:'relative',
            borderColor: "primary.dark",
            display:'flex',
            flexDirection:'row',
            flexWrap: 'wrap',
            alignItems:'center',           
            boxSizing:'border-box',
            //overflow:'auto',   
            // padding:2,  
            mx:'auto', 
				
			}}>  

		{inputText.map((item) => (
			item.type === 'text' ? ( 
			<Grid item xs={11} sm={item.width}
				sx={{
					//border: 4,
					//margin: 2,
                    //: '100%',
				}}
			>
				<TextField fullWidth
					id={item.id}
					label={item.label}
					type={item.type}
					variant="outlined"
					value={item.valor}
					size={window.innerWidth >= 900 ? "medium" : "small"}
					required
					//helperText={errorMessages[item.id=== "Año" ? "Anho": ""]}
					sx={{
						background: theme.palette.primary.contrastText,
						
					}}

					onChange={item.handleChange}
				/>
				</Grid>
			) : item.type === 'date' ? (
				<Grid item xs={11} sm={item.width}>
					<TextField
					fullWidth
					id={item.id}
					label={item.label}
					type={item.type}
					variant="outlined"
					value={item.valor}
					size={window.innerWidth >= 900 ? "medium" : "small"}
					//helperText={errorMessages["VigenciaDesde"]}
					required
					sx={{
						background: theme.palette.primary.contrastText,
						'& .MuiFormHelperText-root': {
							color: 'red',
						}
					}}
					onChange={item.handleChange}
					/>
				</Grid>
			) : item.type === 'select' ? (
				<Grid xs={11} sm={item.width}>
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
				</Grid>
			) : item.type === 'checkbox' && (
				<Grid item xs={11} sm={item.width}>
					
				<FormControlLabel 
					//required
					id={item.id}
					control={<Checkbox />} 
					label={item.label} 
					onChange={item.handleChange}
					value={item.valor}
					/>
				
				</Grid>	
			)

		))}
		</Grid>
    );
};

// FormularioConcurso.propTypes = {
//     inputText: PropTypes.array.isRequired,
// };

FormularioConcurso.PropTypes = {
    inputText: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'date', 'select']).isRequired,
            valor: PropTypes.any.isRequired,
            width: PropTypes.number.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            handleChange: PropTypes.func.isRequired,
        })
    ).isRequired,
}

export default FormularioConcurso;