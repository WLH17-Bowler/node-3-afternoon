require("dotenv").config()
const express = require('express')
const massive = require('massive')
const pc = require('./products_controller')

const app = express()

const {SERVER_PORT} = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set("db", dbInstance)
}).catch(err => console.log(err))

app.use(express.json())

// ENDPOINTS
app.post('/api/products', pc.create)
app.get('/api/products', pc.getAll)
app.get('/api/products/:id', pc.getOne)
app.put('/api/products/:id', pc.update)
app.delete('/api/products/:id', pc.delete)

app.listen(SERVER_PORT, () => {
    console.log(`Server pulse ${SERVER_PORT}`)
})