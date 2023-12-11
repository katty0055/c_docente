import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';


const AppBarMovil = ({ handleDrawerToggle, tituloBarra}) => {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1201,  }}>
        <Toolbar variant='dense'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
         
           {tituloBarra}
        
        </Toolbar>
      </AppBar>

    </>
  );
};

AppBarMovil.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  tituloBarra: PropTypes.node.isRequired,
};

export default AppBarMovil;
