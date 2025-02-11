const express = require('express')
const userRoute = require('./src/routes/user.route')
const scheduleRoute = require('./src/routes/schedule.route')

const cors = require('cors')

const connectDatabase = require('./src/database/db')

const app = express()

connectDatabase()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())


app.listen(3000, ()=>{
    console.log("Server on")
})


app.use('/user', userRoute)
app.use('/schedule', scheduleRoute)