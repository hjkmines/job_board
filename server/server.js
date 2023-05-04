//config
const bodyParser = require('body-parser');
const express = require('express'); 
const dotenv = require('dotenv'); 
//routes
const jobRouter = require('./routes/jobRouter'); 
const userRouter = require('./routes/userRouter');
//midlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
//other
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
//security
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require("cors");

dotenv.config({ path: './config/config.env' });

connectDB(); 

const app = express(); 

app.use(bodyParser.json())
// app.use(express.json()) 
app.use(cookieParser())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(helmet())

app.use(logger)
app.use(errorHandler)

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 100
})

app.use(cors({
    origin: "*"
}))

app.use('/jobs', jobRouter); 
app.use('/user', userRouter);

const PORT = process.env.PORT || 5001; 

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})