const express = require('express')
const router = express.Router()
const clientesController = require('../Controllers/clientControllers.js')

router.get('/',clientesController.mostrarClientes)

module.exports = router