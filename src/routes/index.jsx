//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Postulacion from "../views/Postulacion";
import Pagina from "../views/Pagina/Pagina";
import CargarDocumentos from "../views/CargarDocumentos";
import Login from "../views/Inicio";
import CrearConcurso from "../views/Concurso/CrearConcurso";
import AgregarRequisitos from "../views/Concurso/AgregarRequisitos";
import Editar from "../views/Concurso/editar";
import Postulaciones from "../views/RecuperarPostulaciones";
import CarpetaContenido from "../views/RecuperarPostulaciones/CarpetaContenido";

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
            {
                path: 'editar/',
                element: <Editar/>,
            },
            {
                path: 'recuperar_postulaciones/',
                element: <Postulaciones/>,
            },
            {
                path: 'contenido',
                element: <CarpetaContenido/>
            },
            {
                path: 'crear_concurso/',
                element: <CrearConcurso/>,
            },
            {
                path: 'agregar_requisitos_concurso/',
                element: <AgregarRequisitos/>
            },           
        ],
    },
    {
        path: 'cargar_documentos',
        element: <CargarDocumentos/>
    },
    {
        path: 'editar_concurso/',
        element: <Editar/>,
    },
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
