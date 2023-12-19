//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import PostulacionForm from "../views/Postulacion/PostulacionForm";
import Postulacion from "../views/Postulacion/Postulacion";
import Pagina from "../views/Pagina/Pagina";
import ConcursoCard from "../components/ConcursosCard/ConcursoCard";
import Login from "../views/Inicio";
import CrearConcurso from "../views/Concurso/CrearConcurso";
import ConcursoCreado from "../views/Concurso/ConcursoCreado";
import EditarConcurso from "../views/Concurso/EditarConcurso";
import Editar from "../views/Concurso/editar";


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
                element: <PostulacionForm/>
            },
            {
                path: 'postulacion2/',
                element: <Postulacion/>
            },
            {
                path: 'editar/',
                element: <Editar/>,
            },
        ],
    },
    // {
    //     path: 'postulacion/', // Agrega el parámetro dinámico
    //     element: <PostulacionForm/>
    // },

    // {
    //     path: 'postulacion2/',
    //     element: <Postulacion/>
    // },
    {
        path: 'crear_concurso/',
        element: <CrearConcurso/>
    },
     {
         path: 'concurso_creado/',
         element: <ConcursoCreado/>,

     }
     ,
     {
        //  path: 'editar_concurso/:concurso_id',
        //  element: <EditarConcurso/>,
        path: 'editar_concurso/',
        element: <EditarConcurso/>,
        },
    
        
    
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
