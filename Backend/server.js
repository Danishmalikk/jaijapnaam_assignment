const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cors = require('cors')
//routes
const userRoutes = require('./routes/userRoute')
const itemRoutes = require('./routes/itemRoute')

const connectDb = require('./config/db')

//middlewares
dotenv.config()
app.use(cors({origin: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/v1/api', userRoutes)
app.use('/v1/api', itemRoutes )
//db connection 
connectDb()

const port = process.env.PORT || 5000 
const server = app.listen(port, () => { 
    console.log(`Server is running on ${port}`)
})