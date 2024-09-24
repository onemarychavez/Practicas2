const conexion = require('../conexion/db.js');

const mostrarClientes = async () => {
    const clientes = await conexion.query('SELECT * FROM clientes')
    return clientes.rows
}

const mostrarCliente = async (id) => {
    const cliente = await conexion.query('SELECT * FROM clientes WHERE id = $1', [id])
    return cliente.rows[0]
}

const createCliente = async (nombre, apellido, telefono, correo, dui, direccion) => {
    console.log({ nombre, apellido, telefono, correo, dui, direccion }); // Verifica los valores de entrada

    try {

        const resultadoCliente = await conexion.query(
            'INSERT INTO clientes (nombre, apellido, telefono, correo, dui) VALUES ($1, $2, $3, $4, $5) RETURNING id_cliente',
            [nombre, apellido, telefono, correo, dui]
        );

        const id_cliente = resultadoCliente.rows[0].id_cliente;


        const resultadoDireccion = await conexion.query(
            'INSERT INTO direcciones (id_cliente, direccion) VALUES ($1, $2) RETURNING id_direccion',
            [id_cliente, direccion]
        );

        return {
            clienteId: id_cliente,
            direccionId: resultadoDireccion.rows[0].id_direccion,
        };
    } catch (error) {
        console.error('Error al crear cliente y dirección:', error);
        throw error;
    }
};

const updateCliente = async (id_cliente, nombre, apellido, telefono, correo, dui) => {
     const values = [];
    const updates = [];

     if (nombre !== undefined) {
        values.push(nombre);
        updates.push(`nombre = $${values.length}`);
    }
    if (apellido !== undefined) {
        values.push(apellido);
        updates.push(`apellido = $${values.length}`);
    }
    if (telefono !== undefined) {
        values.push(telefono);
        updates.push(`telefono = $${values.length}`);
    }
    if (correo !== undefined) {
        values.push(correo);
        updates.push(`correo = $${values.length}`);
    }
    if (dui !== undefined) {
        values.push(dui);
        updates.push(`dui = $${values.length}`);
    }

    // Asegúrate de que haya al menos un campo para actualizar
    if (updates.length === 0) {
        throw new Error('No se proporcionaron campos para actualizar');
    }

    // Agrega el ID al final de los valores
    values.push(id_cliente);

    // Construye la consulta SQL
    const query = `
        UPDATE clientes
        SET ${updates.join(', ')}
        WHERE id_cliente = $${values.length}
        RETURNING *;
    `;

    // Ejecuta la consulta
    const result = await conexion.query(query, values);
    return result.rows[0]; // Asegúrate de que retorne el cliente actualizado
};

const deleteCliente = async (id_cliente) => {
    try {
        // Primero, elimina las direcciones asociadas al cliente
        await conexion.query(
            'DELETE FROM direcciones WHERE id_cliente = $1',
            [id_cliente]
        );

        // Luego, elimina el cliente
        const result = await conexion.query(
            'DELETE FROM clientes WHERE id_cliente = $1 RETURNING *',
            [id_cliente]
        );

        // Verifica si el cliente fue eliminado
        if (result.rowCount === 0) {
            throw new Error('Cliente no encontrado');
        }

        return result.rows[0]; // Retorna el cliente eliminado
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        throw error; // Propaga el error para manejarlo en el controlador
    }
};




module.exports = {
    mostrarClientes,
    createCliente,
    updateCliente,
    deleteCliente,

}