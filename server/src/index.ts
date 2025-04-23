import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import routes from './routes';
import { auth } from './firebase/config'; 
import { connectDB } from './db/connect';
import dotenv from 'dotenv';
dotenv.config();

const server = Fastify({ logger: true });

server.register(fastifyCors, {
  origin: '*',
});

server.register(routes);

const start = async () => {
  try {
    // Connect to MongoDB before starting server
    await connectDB(); 
    
    await server.listen({ port: 5000, host: '0.0.0.0' });
    console.log('🚀 Server running at http://localhost:5000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
