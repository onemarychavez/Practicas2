const conexion = require('../conexion/db.js');

const mostrarClientes = async() => {
    const clientes = await conexion.query('SELECT * FROM clientes')
    return clientes.rows
}

const mostrarCliente = async(id) => {
    const cliente = await conexion.query('SELECT * FROM clientes WHERE id = $1', [id])
    return cliente.rows[0]
}
module.exports = {
    mostrarClientes,
    mostrarCliente,
 
}