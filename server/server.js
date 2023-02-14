const express = require('express'); 
const dotenv = require('dotenv'); 
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

dotenv.config({ path: './config/config.env' })

connectDB(); 

const app = express(); 

app.use(bodyParser.json())

const PORT = process.env.PORT || 5001; 


const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})