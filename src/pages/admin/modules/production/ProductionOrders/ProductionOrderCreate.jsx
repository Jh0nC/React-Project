import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductionOrderCreate({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    idUser: '',
    state: '',
    targetDate: '',
    details: [
      { idProduct: '', amount: '', state: '' }
    ]
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = formData.details.map((detail, i) => 
      i === index ? { ...detail, [name]: value } : detail
    );
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { idProduct: '', amount: '', state: '' }]
    });
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/productionOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Orden de producción creada con éxito');
      setError(null);
      setFormData({
        date: '',
        notes: '',
        idUser: '',
        state: '',
        targetDate: '',
        details: [
          { idProduct: '', amount: '', state: '' }
        ]
      }); // Limpiar formulario
      console.log('Response:', result);
      if (onSave) onSave(); // Llamar a onSave para refrescar datos en el componente padre
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className="mx-3">Crear Nueva Orden de Producción</h2>
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <label htmlFor="date" className="form-label">Fecha:</label>
          <input
            id="date"
            className="form-control"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="notes" className="form-label">Notas:</label>
          <textarea
            id="notes"
            className="form-control"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="m-3">
          <label htmlFor="idUser" className="form-label">ID Usuario:</label>
          <input
            id="idUser"
            className="form-control"
            type="number"
            name="idUser"
            value={formData.idUser}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="state" className="form-label">Estado:</label>
          <input
            id="state"
            className="form-control"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="targetDate" className="form-label">Fecha de Entrega:</label>
          <input
            id="targetDate"
            className="form-control"
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <h4 className="m-3">Detalles</h4>
        {formData.details.map((detail, index) => (
          <div key={index} className="m-3 border p-3">
            <div className="mb-3">
              <label htmlFor={`idProduct-${index}`} className="form-label">ID Producto:</label>
              <input
                id={`idProduct-${index}`}
                className="form-control"
                type="number"
                name="idProduct"
                value={detail.idProduct}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`amount-${index}`} className="form-label">Cantidad:</label>
              <input
                id={`amount-${index}`}
                className="form-control"
                type="number"
                name="amount"
                value={detail.amount}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`state-${index}`} className="form-label">Estado:</label>
              <input
                id={`state-${index}`}
                className="form-control"
                type="text"
                name="state"
                value={detail.state}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemoveDetail(index)}
            >
              Eliminar Detalle
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary m-3"
          onClick={handleAddDetail}
        >
          Añadir Detalle
        </button>
        <button type="submit" className="btn btn-warning m-3">Registrar</button>
        <button
          type="button"
          className="btn btn-danger m-3"
          onClick={onClose}
        >
          Cancelar
        </button>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default ProductionOrderCreate;