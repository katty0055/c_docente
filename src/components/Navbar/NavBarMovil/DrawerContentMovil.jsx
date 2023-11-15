import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const DrawerContentMovil = ({ mobileOpen, handleDrawerToggle, navLinks, menuLinks }) => {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
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
        <Box sx={{ display: { xs: 'flex', sm:"none", md: 'none' }, flexDirection: 'column' }}>
          {navLinks.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: 'white' }} primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
    </div>
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
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,  backgroundColor: 'primary.main', },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
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
