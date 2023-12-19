// import { useParams  } from "react-router-dom";
// import { useState, useEffect } from "react";

// // Importar useParams de react-router-dom.
// // Crear una variable codigoConcurso usando el hook useParams para obtener el ID del concurso de los parámetros de la ruta.
// // Crear un estado concurso y una función setConcurso usando el hook useState para almacenar los datos del concurso.
// // Crear un efecto usando el hook useEffect que se ejecuta cuando codigoConcurso cambia. Dentro de este efecto, hacer una solicitud a la API para obtener los datos del concurso y luego establecer el estado concurso con los datos obtenidos.
// // En el componente de renderizado, mostrar los datos del concurso y el campo adicional.

// const MostrarConcursoCreado = () => {
//     const { concurso_id } = useParams();
//     const [concurso, setConcurso] = useState(null);

//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/concurso/concurso/${concurso_id}`)
//             .then((res) => res.json())
//             .then((data) => setConcurso(data.concurso))
//             .catch((error) => console.error(error));
//     }, [concurso_id]);


//     return (
//         <div>
//             {concurso && (
//                 <div>
//                     <h1>{concurso.anho_concurso}</h1>
//                     <p>{concurso.codigo_concurso}</p>
//                     {/* <p>{concurso.fecha_inicio}</p>
//                     <p>{concurso.fecha_fin}</p>
//                     <p>{concurso.codigo}</p> */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ConcursoCreado;


import { useLocation } from 'react-router-dom';

const ConcursoCreado = () => {
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const formData = {};
 for (const [key, value] of queryParams.entries()) {
  formData[decodeURIComponent(key)] = decodeURIComponent(value);
 }

 return (
    <div>
      <h1>Concurso Creado</h1>
      <p>Año Concurso: {formData.anho_concurso}</p>
      <p>Código Concurso: {formData.codigo_concurso}</p>
      <p>Estado Seguimiento Concurso: {formData.estado_seguimiento_concurso}</p>
      <p>Denominación Concurso: {formData.denominacion_conc}</p>
      <p>Vigencia Desde: {formData.vigencia_desde}</p>
      <p>Vigencia Hasta: {formData.vigencia_hasta}</p>
      <p>Tipo Concurso: {formData.tipo_concurso}</p>
      <p>Modalidad Concurso: {formData.modalidad_concurso}</p>
      <p>Estado Concurso: {formData.estado_concurso ? 'TRUE' : 'FALSE'}</p>
      <p>Es Arancelado: {formData.es_arancelado ? 'TRUE' : 'ACEPTO'}</p>
      <p>Es Postulación Múltiple: {formData.es_postulacion_multiple ? 'TRUE' : 'FALSE'}</p>
      <p>Información: {formData.info}</p>
    </div>
  );
};

export default ConcursoCreado;
