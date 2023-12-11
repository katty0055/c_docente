import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import { AppBar, Box, Button } from '@mui/material';





const AppBarComponent = ({ open, handleDrawerOpen, navLinks, tituloBarra }) => {

 
  return (
    <AppBar position='fixed' open={open} sx={{ zIndex: 1201, }}  >
        <Toolbar disableGutters variant='dense' sx={{justifyContent:"space-between" }}>
          <IconButton 
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ml:1}}
            
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {tituloBarra}
          </Typography>
          <Box sx={{alignContent:"center", justifyContent:"center", display: {xs:"none", sm:"flex", md:"flex",}}}>          
            {
              navLinks.map(item => (
                <Button 
                  color="inherit" 
                  key={item.title}
                  component="a"
                  href={item.path} 
                  onClick={item.onClick}            
                >  
                        {item.icon}
                   
                  
                </Button>
              ))
            }
            </Box>
        </Toolbar>
      </AppBar>
  );
};

AppBarComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired, // Asegúrate de que esto sea del tipo correcto
    })
  ).isRequired,
  tituloBarra: PropTypes.node.isRequired,
};

export default AppBarComponent;
