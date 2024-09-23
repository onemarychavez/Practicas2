const express = require('express')
const router = express.Router()
const directControllers = require('../Controllers/directControllers.js')

router.get('/:id_cliente',directControllers.MostrarDireccion)

module.exports = router