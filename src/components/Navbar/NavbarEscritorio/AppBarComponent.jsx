import { styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';


const drawerWidth = 190;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarComponent = ({ open, handleDrawerOpen, navLinks, tituloBarra }) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
              variant="h6"
              textAlign= "center"
              sx={{flexGrow: 1}}
            >
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
  tituloBarra: PropTypes.string.isRequired,
};


export default AppBarComponent;
