import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const DrawerContentMovil = ({ mobileOpen, handleDrawerToggle, navLinks, menuLinks }) => {
  const drawer = (
      <List>
        {menuLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ color: 'white' }} primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none' }, flexDirection: 'column' }}>
          {navLinks.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={item.onClick}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: 'white' }} primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            backgroundColor: 'primary.main', 
            mt:6,
            height: 'calc(100vh - {$mt})',
            borderTopRightRadius:2 ,
            boxShadow: 2,
            zIndex:1201,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

DrawerContentMovil.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      // Puedes agregar más propiedades según la estructura de tu objeto navLinks
    })
  ).isRequired,
  menuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      // Puedes agregar más propiedades según la estructura de tu objeto navLinks
    })
  ).isRequired,
};

export default DrawerContentMovil;
