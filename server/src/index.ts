import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { taskRoutes } from './routes/task';
import { userRoutes } from './routes/user';
import { shareRoutes } from './routes/share';

import { connectDB } from './db/connect';
import dotenv from 'dotenv';
dotenv.config();

const server = Fastify({ logger: true });

server.register(fastifyCors, {
  origin: '*',
  credentials: true,
});

server.register(taskRoutes);
server.register(userRoutes)
server.register(shareRoutes);

const start = async () => {
  try {
    await connectDB(); // Connect to Mongo before server starts
    await server.listen({ port: 5000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:5000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
