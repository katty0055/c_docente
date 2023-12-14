import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import theme from '../../components/Temas/theme';
import PropTypes from 'prop-types';


const FormularioInternoPersona = ({inputText}) => {

  return (   
    <Grid item container
    xs={12} 
    justifyContent={'space-around'}
    sx={{
        //border: 4,
        position:'relative',
        borderColor: "primary.dark",
        display:'flex',
        flexDirection:'row',
        flexWrap: 'wrap',
        alignItems:'center',           
        boxSizing:'border-box',
        overflow:'auto',   
        // padding:2,  
        mx:'auto',   
    }}
  >
           {inputText.map((item) => (
    <Grid item key={item.id}
       xs = {11}
      sx = {{
        margin: 1,
      }}
    >
      {((item.type === 'text') || (item.type === 'date')) && (
        <TextField fullWidth
          id={item.id}
          label={item.label}
          type={item.type}
          variant="outlined"
          value={item.valor}
          size={window.innerWidth >= 900 ? "medium" : "small"}
          required
          sx={{
            // width: item.width,
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
            value={item.options.includes(item.valor) ? item.valor : ''}
            variant="outlined"
            size={window.innerWidth >= 900 ? 'medium' : 'small'}
            required
            sx={{
              background: theme.palette.primary.contrastText,
              // width: item.width,
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
</Grid>
  );
}
FormularioInternoPersona.propTypes = {
  inputText: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'select','date']).isRequired,
      label: PropTypes.string.isRequired,
      valor: PropTypes.any.isRequired,
      width: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(PropTypes.string), // Ajusta según sea necesario
      handleChange: PropTypes.func, // Ajusta según sea necesario
    })
  ).isRequired,
};
export default FormularioInternoPersona;
