import React, { useState } from 'react';
import axios from 'axios';

const CrearClienteForm = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDui] = useState('');
    const [direccion, setDireccion] = useState('');

    const handleCrearCliente = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            const response = await axios.post('http://localhost:5000/api/clientes/crear', null, {
                params: {
                    nombre,
                    apellido,
                    telefono,
                    correo,
                    dui,
                    direccion
                }
            });
            console.log('Cliente creado:', response.data);
        } catch (error) {
            console.error('Error creando cliente:', error);
        }
    };

    return (
        <form onSubmit={handleCrearCliente}>
            <div>
                <label>Nombre:</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                />
            </div>
            <div>
                <label>Apellido:</label>
                <input 
                    type="text" 
                    value={apellido} 
                    onChange={(e) => setApellido(e.target.value)} 
                />
            </div>
            <div>
                <label>Teléfono:</label>
                <input 
                    type="text" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                />
            </div>
            <div>
                <label>Correo:</label>
                <input 
                    type="email" 
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)} 
                />
            </div>
            <div>
                <label>DUI:</label>
                <input 
                    type="text" 
                    value={dui} 
                    onChange={(e) => setDui(e.target.value)} 
                />
            </div>
            <div>
                <label>Dirección:</label>
                <input 
                    type="text" 
                    value={direccion} 
                    onChange={(e) => setDireccion(e.target.value)} 
                />
            </div>
            <button type="submit">Crear Cliente</button>
        </form>
    );
};

export default CrearClienteForm;
