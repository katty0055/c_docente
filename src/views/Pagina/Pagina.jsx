import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Hidden} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerComponent from '../../components/Navbar/NavbarEscritorio/DrawerComponent';
import AppBarMovil from '../../components/Navbar/NavBarMovil/AppBarMovil';
import DrawerContentMovil from '../../components/Navbar/NavBarMovil/DrawerContentMovil';
import AppBarComponent from '../../components/Navbar/NavbarEscritorio/AppBarComponent';
import Logo from '../../assets/fpuna.png'
import { useMediaQuery } from '@mui/material';
import { useUserData } from '../../state/useState';
import { Outlet } from 'react-router-dom';
import ConcursoCard from '../../components/ConcursosCard/ConcursoCard';
import { useLocation } from 'react-router-dom';


const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return {
      flexGrow: 1,  
      paddingTop: theme.spacing(6),
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

export default function Pagina() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {userId,clearUserId } = useUserData();
  const location = useLocation();

  const onLogout = () => {
    clearUserId();
    console.log(`Codigo de usuario salido: ${userId}`)
    window.localStorage.removeItem('accessToken')
  };

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
    {
      title: "Editar Concurso",
      path: "editar/",
      icon: <MenuIcon/>,
      onClick: onLogout
    }
  ];

  const tituloBarra = <img src={Logo} alt="Logo" style={{ width: 70, height: 'auto', display:'flex', flexShrink: 2 }} />;
 
  return (
    <>
    <Box sx={{ display: 'flex', position:'relative', border:4, height:'100vh' }}>
    <Hidden smUp>
       <AppBarMovil handleDrawerToggle={handleDrawerToggle} tituloBarra = {tituloBarra}/>
       <DrawerContentMovil mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} navLinks = {navLinks} menuLinks = {menuLinks} />
      </Hidden>
      <Hidden smDown>      
      <AppBarComponent  open={open} handleDrawerOpen={handleDrawerOpen} navLinks = {navLinks}  tituloBarra = {tituloBarra}/>
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} menuLinks = {menuLinks} />
      </Hidden>     
      <Main open={open} >
        <Box
         sx={{
          height:'100%',
          borderColor: "primary.dark",
          display:'flex',
          flexDirection:'column',
          gap:2,
          boxSizing:'border-box',
          overflow:'auto',        
        }}
        >      
      {location.pathname === '/concurso_docente/' ? (
              <ConcursoCard />
            ) : (
              <Outlet />
            )}
        </Box>     
      </Main>
    </Box>
    </>
  );
}