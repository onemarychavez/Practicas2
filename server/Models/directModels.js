const conexion = require('../conexion/db.js')

const MostrarDireccion = async (id_cliente) => {
    const resultado = await conexion.query('SELECT * FROM direcciones WHERE id_cliente = $1',[id_cliente])
    return resultado.rows
}



module.exports = {
    MostrarDireccion,
}