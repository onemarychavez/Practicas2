const clientes = require('../Models/clientModels.js')

const mostrarClientes = async (req, res) => {
    try {
        const clienst = await clientes.mostrarClientes()
        res.json(clienst)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createCliente = async (req, res) => {
    try {

        const { nombre, apellido, telefono, correo, dui, direccion } = req.query;

        if (!nombre || !apellido || !telefono || !correo || !dui || !direccion) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const clienteNuevo = await clientes.createCliente(nombre, apellido, telefono, correo, dui, direccion);
        res.status(201).json(clienteNuevo);
    } catch (error) {
        console.error('Error al crear cliente:', error.message); // Log del error
        res.status(500).json({ error: error.message });
    }
};

const updateCliente = async (req, res) => {
    try {
        // Asegúrate de usar req.query si estás enviando datos como parámetros de consulta
        const { id_cliente, nombre, apellido, telefono, correo, dui } = req.query;

        // Verifica que id_cliente esté definido
        if (!id_cliente) {
            return res.status(400).json({ error: 'El ID del cliente es requerido' });
        }

        // Llama a la función de actualización
        const clienteActualizado = await clientes.updateCliente(id_cliente, nombre, apellido, telefono, correo, dui);

        // Verifica si se actualizó el cliente
        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Responde con el cliente actualizado
        res.json(clienteActualizado);
        console.log(`Cliente ${id_cliente} actualizado`);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteCliente = async (req, res) => {
    try {
        
        const { id_cliente } = req.params; 

        const clienteEliminado = await clientes.deleteCliente(id_cliente);
        
        // Verifica si se encontró y eliminó el cliente
        if (!clienteEliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Respuesta exitosa
        res.status(200).json({ message: 'Cliente eliminado', cliente: clienteEliminado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    mostrarClientes,
    createCliente,
    updateCliente,
    deleteCliente
}