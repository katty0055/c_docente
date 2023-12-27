import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';


const ModalArchivo = ({ archivoNombre, direccionUrl, onClose, contenidoArchivo }) => {
  console.log(contenidoArchivo)
  return (
    <div className="modal" style={{ display: contenidoArchivo ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Nombre del Archivo: {archivoNombre}</p>
        <p>Dirección URL: {direccionUrl}</p>
        <iframe width="800"
                        height="1000"
                        src= 
                        {direccionUrl}
                        title="GeeksforGeeks" > 
                </iframe> 
        {/* {contenidoArchivo} */}
      </div>
    </div>
  );
};

const CarpetaContenido = () => {
  const location = useLocation();
<<<<<<< HEAD
const nombreArchivo = location.state ? location.state.nombreArchivo : 'Nombre de archivo predeterminado';
=======
  const nombreArchivo = location.state?.nombreArchivo; // Usar optional chaining
>>>>>>> origin/main
  const [archivos, setArchivos] = useState([]);
  const [nombreArchivoSeleccionado, setNombreArchivoSeleccionado] = useState(null);
  const [contenidoArchivo, setContenidoArchivo] = useState(null);
  const localhost = 'desarrollodtic.pol.una.py'

  useEffect(() => {
    // Hacer la solicitud al servidor para obtener la lista de archivos
    const obtenerArchivos = async () => {
      try {
        const direccionUrl = `http://${localhost}:3000/postulaciones/${nombreArchivo}`;
        const response = await fetch(direccionUrl);
        const data = await response.json();

        if (response.ok) {
          setArchivos(data.archivos);
        } else {
          console.error('Error al obtener la lista de archivos:', data.error);
        }
      } catch (error) {
        console.error('Error de red:', error.message);
      }
    };

    obtenerArchivos();
  }, [nombreArchivo]);

  const mostrarModal = async (archivo) => {
    if (nombreArchivo) {
      setNombreArchivoSeleccionado(archivo);
    }

    try {
      const response = await fetch(`http://${localhost}:3000/postulaciones/${nombreArchivo}/${nombreArchivoSeleccionado}`);
      const contenido = await response.text();

      if (response.ok) {
        setContenidoArchivo(contenido);
      } else {
        console.error('Error al obtener el contenido del archivo:', contenido);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  const cerrarModal = () => {
    setNombreArchivoSeleccionado(null);
    setContenidoArchivo(null);
  };

  return (
    <div>
      <h2>Lista de Archivos:</h2>
      <ul>
        {archivos.map((archivo, index) => (
          <li key={index} onClick={() => mostrarModal(archivo)}>
            {archivo}
          </li>
        ))}
      </ul>

      <ModalArchivo
        archivoNombre={nombreArchivoSeleccionado}
        direccionUrl={`http://${localhost}:3000/postulaciones/${nombreArchivo}/${nombreArchivoSeleccionado}`}
        contenidoArchivo={contenidoArchivo}
        onClose={cerrarModal}
      />
    </div>
  );
};

CarpetaContenido.propTypes = {
  nombreArchivo: PropTypes.string.isRequired,
};

export default CarpetaContenido;
