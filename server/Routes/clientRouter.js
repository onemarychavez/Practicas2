const express = require('express')
const router = express.Router()
const clientesController = require('../Controllers/clientControllers.js')

router.get('/',clientesController.mostrarClientes)
router.post('/crear',clientesController.createCliente)
router.put('/actualizar',clientesController.updateCliente)
router.delete('/eliminar/:id_cliente',clientesController.deleteCliente)

module.exports = router