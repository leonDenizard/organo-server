const express = require('express');
const userRoute = require('./src/routes/user.route');
const scheduleRoute = require('./src/routes/schedule.route');

const cors = require('cors');

const connectDatabase = require('./src/database/db');
const Schedule = require('./src/models/Schedule');

const app = express();

connectDatabase();

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Requisição recebida de:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('⚠️ Origin não permitida:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5174',
  'https://organo-two-henna.vercel.app',
  'https://server-ten-ivory.vercel.app/api'
];


app.use('/api/user', userRoute);
app.use('/api/schedule', scheduleRoute);

app.delete('/api/schedule', async (req, res) => {
  try {
    await Schedule.deleteMany();
    res.status(200).json({ message: 'Escala deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;