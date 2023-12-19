import React, { useState } from 'react';
import axios from 'axios';

const CargarDocumentos = () => {
  const [archivo, setArchivo] = useState(null);

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('archivo', archivo);

    alert("esta a punto de subir un archivo!")

    try {
      // Envia el archivo al servidor
      await axios.post('http://localhost:5173/subir-archivo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Archivo subido y guardado en la base de datos correctamente.');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  return (
    <div>
      <p>Subir foto de CI</p>
      <input type="file" name="archivo" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Enviar Documento</button>
    </div>
  );
};

export default CargarDocumentos;