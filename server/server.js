const express = require('express'); 
const dotenv = require('dotenv'); 
const connectDB = require('./config/db')
const jobRouter = require('./routes/jobRouter'); 
const cors = require("cors");

dotenv.config({ path: './config/config.env' })

connectDB(); 

const app = express(); 
app.use(cors({origin:true, credentials: true}))

app.use(express.json())


const PORT = process.env.PORT || 5001; 

app.use('/jobs', jobRouter); 

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

