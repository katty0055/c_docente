import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBarComponent from '../../components/Navbar/NavbarEscritorio/AppBarComponent';
import DrawerComponent from '../../components/Navbar/NavbarEscritorio/DrawerComponent';
import MenuIcon from '@mui/icons-material/Menu';
import { Hidden } from '@mui/material';
import AppBarMovil from '../../components/Navbar/NavBarMovil/AppBarMovil';
import DrawerContentMovil from '../../components/Navbar/NavBarMovil/DrawerContentMovil';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Pagina() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navLinks = [
    {
      title: "Perfil",
      path: "perfil",
      icon: <AccountCircleIcon/>,
    },
    {
      title: "Salir",
      path: "salir",
      icon: <LogoutIcon/>,
    },
  ];

  const menuLinks = [
    {
      title: "Menu1",
      path: "menu1",
      icon: <MenuIcon/>,
    },
    {
      title: "Menu2",
      path: "menu2",
      icon: <MenuIcon/>,
    },
  ];

  const tituloBarra = "Politecnica2"



  return (
    <Box sx={{ display: 'flex' }}>
      <Hidden smUp>
       <AppBarMovil handleDrawerToggle={handleDrawerToggle} tituloBarra = {tituloBarra}/>
       <DrawerContentMovil mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} navLinks = {navLinks} menuLinks = {menuLinks} />
      </Hidden>
      <Hidden smDown>
        <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} navLinks = {navLinks}  tituloBarra = {tituloBarra}/>
        {/* Renderiza el DrawerComponent como un drawer en pantallas más grandes */}
        <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} menuLinks = {menuLinks}/>
      </Hidden>
      <Box component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          pt: 10,
        }}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
        </Typography>
      </Box>
    </Box>
  );
}
