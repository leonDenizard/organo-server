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


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api/user', userRoute)
app.use('/api/schedule', scheduleRoute)

module.exports = app