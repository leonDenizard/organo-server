const express = require('express')
const userRoute = require('./src/routes/user.route')
const scheduleRoute = require('./src/routes/schedule.route')

const cors = require('cors')

const connectDatabase = require('./src/database/db')
const Schedule = require('./src/models/Schedule')

const app = express()

connectDatabase()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
  origin: 'https://organo-two-henna.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,  // se usar cookies ou auth
};

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api/user', userRoute)
app.use('/api/schedule', scheduleRoute)

app.delete('/api/schedule', async (req, res) => {
  try {
    await Schedule.deleteMany();
    res.status(200).json({ message: 'Escala deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = app