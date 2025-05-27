// import mongoose from 'mongoose';
// import Schedule from '../src/models/Schedule';  // ajuste o path conforme sua estrutura

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// export default async function handler(req, res) {
//   await connectDB();

//   if (req.method === 'DELETE') {
//     try {
//       await Schedule.deleteMany();  // ou ajuste conforme sua lógica
//       return res.status(200).json({ message: 'Escala deletada com sucesso' });
//     } catch (err) {
//       console.error('Erro ao deletar escala:', err);
//       return res.status(500).json({ error: err.message });
//     }
//   }

//   if (req.method === 'GET') {
//     try {
//       const schedules = await Schedule.find();
//       return res.status(200).json(schedules);
//     } catch (err) {
//       console.error('Erro ao buscar escalas:', err);
//       return res.status(500).json({ error: err.message });
//     }
//   }

//   res.setHeader('Allow', ['GET', 'DELETE']);
//   return res.status(405).end(`Método ${req.method} não permitido`);
// }
