//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import PostulacionForm from "../views/Postulacion/PostulacionForm";
import Postulacion from "../views/Postulacion/Postulacion";
import Pagina from "../views/Pagina/Pagina";
import ConcursoCard from "../components/ConcursosCard/ConcursoCard";
import Login from "../views/Inicio";


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
    
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
