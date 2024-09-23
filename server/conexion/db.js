const {Pool} = require('pg')

const conexion = new Pool({
    user:'postgres',
    host:'localhost',
    database:'Practicas',
    password:'123',
    port:5432,
})

const test = async () =>{
    try {
        const client = await conexion.connect()
        console.log('conexion exitosa')
        client.release()
    } catch (error) {
        console.log('error al conectarse')
    }
}
test()
module.exports = conexion