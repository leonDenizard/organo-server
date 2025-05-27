const mongoose = require('mongoose');
const Schedule = require('../src/models/Schedule');  // ajuste o path conforme sua estrutura

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'DELETE') {
    try {
      await Schedule.deleteMany();
      return res.status(200).json({ message: 'Escala deletada com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
};
