import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Hidden, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerComponent from '../../components/Navbar/NavbarEscritorio/DrawerComponent';
import AppBarMovil from '../../components/Navbar/NavBarMovil/AppBarMovil';
import DrawerContentMovil from '../../components/Navbar/NavBarMovil/DrawerContentMovil';
import AppBarComponent from '../../components/Navbar/NavbarEscritorio/AppBarComponent';
import Logo from '../../assets/fpuna.png'
import ConcursoCard from '../../components/ConcursosCard/ConcursoCard';
import { useMediaQuery } from '@mui/material';


const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: isSmallScreen ? 0 : `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: !isSmallScreen ? 0 : `-${drawerWidth}px`,
      }),
    };
  },
);

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );




export default function Pagina({onLogout,userId}) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navLinks = [
    {
      title: "Perfil",
      path: "perfil",
      icon: <AccountCircleIcon/>,
      onClick: onLogout
    },
    {
      title: "Salir",
      path: "/",
      icon: <LogoutIcon/>,
      onClick: onLogout
    },
  ];

  const menuLinks = [
    {
      title: "Menu1",
      path: "menu1",
      icon: <MenuIcon/>,
      onClick: onLogout
    },
    {
      title: "Menu2",
      path: "menu2",
      icon: <MenuIcon/>,
      onClick: onLogout
    },
  ];

  const tituloBarra = <img src={Logo} alt="Logo" style={{ width: 70, height: 'auto', display:'flex', flexShrink: 2 }} />;
 


  return (
    <>

    <Box sx={{ display: 'flex' }}>
    <Hidden smUp>
       <AppBarMovil handleDrawerToggle={handleDrawerToggle} tituloBarra = {tituloBarra}/>
       <DrawerContentMovil mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} navLinks = {navLinks} menuLinks = {menuLinks} />
      </Hidden>
      <Hidden smDown>
      
      <AppBarComponent  open={open} handleDrawerOpen={handleDrawerOpen} navLinks = {navLinks}  tituloBarra = {tituloBarra}/>
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} menuLinks = {menuLinks} />
      </Hidden>
     
      <Main open={open} >
      
       <ConcursoCard/>
      </Main>
    </Box>
    </>
  );
}