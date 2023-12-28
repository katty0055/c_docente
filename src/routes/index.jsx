//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
//import PostulacionForm from "../views/Postulacion/PostulacionForm";
import Postulacion from "../views/Postulacion";
import Pagina from "../views/Pagina/Pagina";
import CargarDocumentos from "../views/CargarDocumentos";
//import ConcursoCard from "../components/ConcursosCard/ConcursoCard";
import Login from "../views/Inicio";
import CrearConcurso from "../views/Concurso/CrearConcurso";
import AgregarRequisitos from "../views/Concurso/AgregarRequisitos";

//import ConcursoCreado from "../views/Concurso/ConcursoCreado";
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
            {
                path: 'editar/',
                element: <Editar/>,
            },
            {
                path: 'recuperar_postulaciones/',
                element: <Postulaciones/>,
                //children: [
                   
                //]
                
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
   
     ,
     {
        //  path: 'editar_concurso/:concurso_id',
        //  element: <EditarConcurso/>,
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
