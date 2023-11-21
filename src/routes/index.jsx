//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Inicio from "../views/Inicio";
import Pagina from "../views/Pagina/Pagina";
import PostulacionForm from "../views/Postulacion/PostulacionForm";


const router = createBrowserRouter([
    // Definición de rutas
    {
        path: '/',
        element: <Inicio />
    },
    {
        path: 'concurso_docente',
        element: <Pagina/>
    },
    {
        path: 'postulacion',
        element: <PostulacionForm/>
    },
    
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
