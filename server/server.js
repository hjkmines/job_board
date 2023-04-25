//config
const bodyParser = require('body-parser');
const express = require('express'); 
const dotenv = require('dotenv'); 
const connectDB = require('./config/db.js')
const cors = require("cors");
//routes
const jobRouter = require('./routes/jobRouter'); 
//midlewares

//other


dotenv.config({ path: './config/config.env' });

connectDB(); 

const app = express(); 
app.use(cors({origin:true, credentials: true}))

app.use(express.json())


const PORT = process.env.PORT || 5001; 

app.use('/jobs', jobRouter); 

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})