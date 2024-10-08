import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function UserCreate() {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Función para obtener los roles desde la API
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/role');
        if (!response.ok) {
          throw new Error('Error al obtener los roles');
        }
        const data = await response.json();
        setRoles(data); // Guardar los roles en el estado
      } catch (error) {
        setError('Error al cargar roles: ' + error.message);
      }
    };

    fetchRoles(); // Llamar a la función cuando el componente se monta
  }, []);

  const onSubmit = async (data) => {
    const formDataToSend = {
      ...data,
      state: 1,
      idRole: parseInt(data.idRole, 10) // Asegúrate de que "idRole" sea un número
    };

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Usuario creado con éxito');
      setError(null);

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario creado con éxito.',
      }).then(() => {
        navigate('/admin/users'); // Redireccionar después de hacer clic en "OK"
      });

      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el usuario.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2 className='mx-3'>Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="email" className="form-label">Correo:</label>
              <input
                id="email"
                className='form-control'
                type="email"
                {...register("mail", { required: true, pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
              />
              {errors.mail?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
              {errors.mail?.type==='pattern' && (
                <div className="alert alert-danger p-1 col mt-2">Introduzca un correo electronico valido</div>
              )}
            </div>
            <div className='col-sm'>
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                className='form-control'
                type="password"
                {...register('password', { required: true, pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/  })}
              />
              {errors.password?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
              {errors.password?.type==='pattern' && (
                <div className="alert alert-danger p-1 col mt-2">La contraseña debe tener mínimo 8 caracteres, un número y un carácter especial</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="firstName" className="form-label">Nombre</label>
              <input
                id="firstName"
                className='form-control'
                type="text"
                {...register('firstName', { required: true })}
              />
              {errors.firstName?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
            <div className='col-sm'>
              <label htmlFor="lastName" className="form-label">Apellido</label>
              <input
                id="lastName"
                className='form-control'
                type="text"
                {...register('lastName', { required: true })}
              />
              {errors.lastName?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="document" className="form-label">Documento</label>
              <input
                id="document"
                className='form-control'
                type="text"
                {...register('document', { required: true, minLength:8, maxLength:10 })}
              />
              {errors.document?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
              {errors.document?.type==='minLength' && (
                <div className="alert alert-danger p-1 col mt-2">El documento debe tener mínimo 8 números</div>
              )}
              {errors.document?.type==='maxLength' && (
                <div className="alert alert-danger p-1 col mt-2">El documento debe tener máximo 10 números</div>
              )}
            </div>
            <div className='col-sm'>
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                id="address"
                className='form-control'
                type="text"
                {...register('address', { required: true })}
              />
              {errors.address?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="phoneNumber" className="form-label">Teléfono</label>
              <input
                id="phoneNumber"
                className='form-control'
                type="text"
                {...register('phoneNumber', { required: true, minLength:7, maxLength:10 })}
              />
              {errors.phoneNumber?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
              {errors.phoneNumber?.type==='minLength' && (
                <div className="alert alert-danger p-1 col mt-2">El teléfono debe tener mínimo 7 números</div>
              )}
              {errors.phoneNumber?.type==='maxLength' && (
                <div className="alert alert-danger p-1 col mt-2">El teléfono debe tener máximo 10 números</div>
              )}
            </div>
            <div className='col-sm'>
              <label htmlFor="role" className="form-label">Rol:</label>
              <select
                id="role"
                className='form-control'
                {...register('idRole', { required: true })}
              >
                <option value="">Seleccione un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
              {errors.idRole?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link to={"/admin/users"} className='btn btn-secondary rounded-5'>Regresar</Link>
            <button type="submit" className='btn btn-success rounded-5'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserCreate;