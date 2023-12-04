import { useState, useEffect } from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

function PostulacionForm() {
  const [postulacion, setPostulacion] = useState({
    postulacion_id: '',
    anho: '',
    fecha_postulacion: '',
    cargo_id: '',
    concurso_id: '',
    puesto_id: '',
    usuario_id: '',
  });
  const [concursoOptions, setConcursoOptions] = useState([]);
  const [dependenciaOptions, setDependenciaOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [cargoOptions, setCargoOptions] = useState([]);
  const [puestoOptions, setPuestoOptions] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedDependencia, setSelectedDependencia] = useState('');

  useEffect(() => {
    const fechaHoy = new Date();
    const fechaFormateada = fechaHoy.toISOString().substr(0, 10);
    const anhoActual = fechaHoy.getFullYear();
    setPostulacion({
      ...postulacion,
      fecha_postulacion: fechaFormateada,
      anho: anhoActual.toString(),
    });

    loadConcursoData();
    loadDependenciaData();
    loadAreaData();
    loadCargoData();
    loadPuestoData();
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      setUserId(jwtDecode(token).user_id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostulacion({ ...postulacion, [name]: value });
  };

  const loadConcursoData = () => {
    Axios.get('http://localhost:8000/concurso/concurso/')
      .then((response) => {
        const concursoData = response.data;
        setConcursoOptions(concursoData);
      })
      .catch((error) => {
        console.error('Error al cargar los datos de Concurso:', error);
      });
  };

  const loadDependenciaData = () => {
    Axios.get('http://localhost:8000/concurso/dependencia/')
      .then((response) => {
        const dependenciaData = response.data;
        setDependenciaOptions(dependenciaData);
      })
      .catch((error) => {
        console.error('Error al cargar los datos de Dependencia:', error);
      });
  };

  const loadAreaData = () => {
    if (selectedDependencia) {
      Axios.get(`http://localhost:8000/concurso/area/${selectedDependencia}`)
        .then((response) => {
          const areaData = response.data;
          setAreaOptions(areaData);
        })
        .catch((error) => {
          console.error('Error al cargar los datos de Area:', error);
        });
    } else {
      setAreaOptions([]);
    }
  };

  const loadCargoData = () => {
    Axios.get('http://localhost:8000/concurso/cargo/')
      .then((response) => {
        const cargoData = response.data;
        setCargoOptions(cargoData);
      })
      .catch((error) => {
        console.error('Error al cargar los datos de Cargo:', error);
      });
  };

  const loadPuestoData = () => {
    Axios.get('http://localhost:8000/concurso/puesto/')
      .then((response) => {
        const puestoData = response.data;
        setPuestoOptions(puestoData);
      })
      .catch((error) => {
        console.error('Error al cargar los datos de Puesto:', error);
      });
  };

  const sendPostulacion = (data) => {
    Axios.post('http://localhost:8000/concurso/postulacion/', data)
      .then((response) => {
        console.log('Postulación enviada con éxito');
      })
      .catch((error) => {
        console.error('Error al enviar la postulación:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPostulacion(postulacion);
  };

  const handleFieldClick = () => {
    setShowMessage(!showMessage);
  };

  const customFormat = 'DD/MM/YYYY';

  return (
    <>
      <form onSubmit={handleSubmit} style={{position:'relative'}}>
        <div>
          <div>
            <h1>Formulario de Postulación</h1>

            <div>
              <label>Año</label>
              <input
                type="text"
                name="anho"
                value={postulacion.anho}
                readOnly={true}
                onClick={handleFieldClick}
              />
              {showMessage && <span>Edición no disponible</span>}
            </div>

            <div className="form-group">
              <label>Fecha de Postulación</label>
              <input
                type="date"
                name="fecha_postulacion"
                value={postulacion.fecha_postulacion}
                readOnly={true}
                onClick={handleFieldClick}
                format={customFormat}
              />
              {showMessage && <span>Edición no disponible</span>}
            </div>

            <div className="form-group">
              <label>Concurso</label>
              <select
                name="concurso_id"
                value={postulacion.concurso_id}
                onChange={handleChange}
              >
                <option value="">Seleccionar Concurso</option>
                {concursoOptions.map((concurso) => (
                  <option key={concurso.concurso_id} value={concurso.concurso_id}>
                    {concurso.denominacion_conc}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Dependencia</label>
              <select
                name="dependencia_id"
                value={selectedDependencia}
                onChange={(e) => setSelectedDependencia(e.target.value)}
              >
                <option value="">Seleccionar Dependencia</option>
                {dependenciaOptions.map((dependencia) => (
                  <option
                    key={dependencia.dependencia_id}
                    value={dependencia.dependencia_id}
                  >
                    {dependencia.descripcion_dependencia}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Área</label>
              <select
                name="area_id"
                value={postulacion.area_id}
                onChange={handleChange}
              >
                <option value="">Seleccionar Área</option>
                {areaOptions
                  .filter((area) => area.dependencia_id === selectedDependencia)
                  .map((area) => (
                    <option key={area.area_id} value={area.area_id}>
                      {area.descripcion_area}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cargo</label>
              <select
                name="cargo_id"
                value={postulacion.cargo_id}
                onChange={handleChange}
              >
                <option value="">Seleccionar Cargo</option>
                {cargoOptions.map((cargo) => (
                  <option key={cargo.cargo_id} value={cargo.cargo_id}>
                    {cargo.descripcion_cargo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Puesto</label>
              <select
                name="puesto_id"
                value={postulacion.puesto_id}
                onChange={handleChange}
              >
                <option value="">Seleccionar Puesto</option>
                {puestoOptions.map((puesto) => (
                  <option key={puesto.puesto_id} value={puesto.puesto_id}>
                    {puesto.descripcion_puesto}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Usuario</label>
              <input
                type="text"
                name="usuario_id"
                value={userId}
                readOnly={true}
                onClick={handleFieldClick}
              />
              {showMessage && <span>Edición no disponible</span>}
            </div>

            <button type="submit">Enviar Postulación</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PostulacionForm;
