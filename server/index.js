const express = require('express')
const app = express()
const cors = require('cors')
const clientesRoutes = require('./Routes/clientRouter.js')

app.use(express.json())

app.use('/api/clientes', clientesRoutes)
app.use(cors())
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('servidor corriendo en el puerto 3000')
})
