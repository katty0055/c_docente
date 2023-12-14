//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
//import PostulacionForm from "../views/Postulacion/PostulacionForm";
import StepperComponent from "../views/Postulacion";
import Pagina from "../views/Pagina/Pagina";
import CargarDocumentos from "../views/CargarDocumentos";
//import ConcursoCard from "../components/ConcursosCard/ConcursoCard";
import Login from "../views/Inicio";
//import StepperComponent from "../views/Postulacion/StepperComponentEscritorio";
//import StepperComponentM from "../views/Postulacion/StepperComponentMovil";

const router = createBrowserRouter([
    // Definición de rutas
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'concurso_docente/',
        element: <Pagina/>,
        children: [
            {
                path: 'postulacion2/',
                element: <StepperComponent/>
            },
            // {
            //     path: 'postulacion/',
            //     element: <Postulacion/>
            // }, 
        ],
    },
    {
        path: 'cargar_documentos',
        element: <CargarDocumentos/>
    },
    

    // {
    //     path: 'postulacion/', // Agrega el parámetro dinámico
    //     element: <PostulacionForm/>
    // },

    // {
    //     path: 'postulacion2/',
    //     element: <Postulacion/>
    // },
    
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
