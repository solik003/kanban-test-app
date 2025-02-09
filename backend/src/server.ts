import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cardRoutes from './routes/cardRoutes';
import boardRoutes from './routes/boardRoutes';
import listRoutes from './routes/listRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/cards', cardRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello, Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});