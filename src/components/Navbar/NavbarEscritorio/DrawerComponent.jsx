import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 200;
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),

//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-start',

// }));
const DrawerComponent = ({ open, handleDrawerClose, menuLinks }) => {
  const theme = useTheme();
  return (
    <Drawer  
    style={{
     background:'transparent',
     transition: 'background 0.2s ease', // Agrega una transición suave
   }}
   sx={{
     width: drawerWidth,
     flexShrink: 0,        
     '& .MuiDrawer-paper': {
      mt:6,
      height: 'calc(100vh - {$mt})',
      boxShadow: 2,
      borderTopRightRadius:2,
      zIndex:1201,
       width: drawerWidth,
       boxSizing: 'border-box',
       background: open ? theme.palette.primary.main : 'transparent', // Asegúrate de que el color coincida
       transition: 'background 0.2s ease', // Agrega una transición suave
      //  borderRight: "none",
       color:theme.palette.primary.contrastText,
     },
   }}
   variant="persistent"
   anchor="left"
   open={open}
 >
   {/* <DrawerHeader  >
     <IconButton onClick={handleDrawerClose} sx={{ color: 'white',  }}>
       {theme.direction === 'ltr' ? <MenuIcon /> : <MenuIcon />}
     </IconButton>
     <Typography variant="h6" noWrap component="div" sx={{ ml: 2, }}>
       Titulo
     </Typography>
   </DrawerHeader> */}
   <List>
      {menuLinks.map((item) => (
        <ListItem key={item.title} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
            <ListItemText sx={{ color: 'white' }} primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}     
    </List>

 </Drawer>
  );
};

DrawerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  menuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      // Puedes agregar más propiedades según la estructura de tu objeto navLinks
    })
  ).isRequired,
};

export default DrawerComponent;
