import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';


const AppBarMovil = ({ handleDrawerToggle, tituloBarra}) => {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           {tituloBarra}
          </Typography>
        </Toolbar>
      </AppBar>

    </>
  );
};

AppBarMovil.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  tituloBarra: PropTypes.string.isRequired,
};

export default AppBarMovil;
