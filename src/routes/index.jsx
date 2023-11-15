//componente donde estan las rutas
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Inicio from "../views/Inicio";
import Pagina from "../views/Pagina/Pagina";

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
]);

const MyRoutes = () => {
    return (
        <RouterProvider router = {router}/>
    );
};

export default MyRoutes;
