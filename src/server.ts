import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { userRouter } from './interfaces/routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});