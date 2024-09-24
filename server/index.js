const express = require('express')
const cors = require('cors')
const clientesRoutes = require('./Routes/clientRouter.js')
const directRoutes = require('./Routes/directRouter.js')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// Definir las rutas de clientes y direcciones
app.use('/api/clientes', clientesRoutes)
app.use('/api/direcciones', directRoutes)  

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})
