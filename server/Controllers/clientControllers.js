const clientes = require('../Models/clientModels.js')

const mostrarClientes = async(req,res)=>{
    try {
        const clienst = await clientes.mostrarClientes()
        res.json(clienst)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    mostrarClientes
}