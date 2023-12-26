//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
//import PostulacionForm from "../views/Postulacion/PostulacionForm";
import Postulacion from "../views/Postulacion";
import Pagina from "../views/Pagina/Pagina";
import CargarDocumentos from "../views/CargarDocumentos";
//import ConcursoCard from "../components/ConcursosCard/ConcursoCard";
import Login from "../views/Inicio";
import CrearConcurso from "../views/Concurso/CrearConcurso";
import ConcursoCreado from "../views/Concurso/ConcursoCreado";
import Editar from "../views/Concurso/editar";
import Postulaciones from "../views/RecuperarPostulaciones";
import CarpetaContenido from "../views/RecuperarPostulaciones/CarpetaContenido";
//import Documento from "../views/RecuperarPostulaciones/PDFViewer";

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
                path: 'postulacion/',
                element: <Postulacion/>
            },
    //         {
    //             path: 'editar/',
    //             element: <Editar/>,
    //         },
    //         {
    //             path: 'recuperar_postulaciones/',
    //             element: <Postulaciones/>,                
    //         },
    //         {
    //             path: 'contenido',
    //             element: <CarpetaContenido/>
    //         },
    //         {
    //             path: 'crear_concurso/',
    //             element: <CrearConcurso/>
    //         },
           
        ],
    },
    // {
    //     path: 'cargar_documentos',
    //     element: <CargarDocumentos/>
    // },
    // {
    //     path: 'concurso_creado/',
    //     element: <ConcursoCreado/>,

    // },
    // {
    //     path: 'editar_concurso/',
    //     element: <Editar/>,
    // },
    
        
    
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
