const direccion = require('../Models/directModels.js')

const MostrarDireccion = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const direcciones = await direccion.MostrarDireccion(id_cliente)
        res.json(direcciones)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    MostrarDireccion,
}