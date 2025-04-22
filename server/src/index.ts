import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import routes from './routes';

const server = Fastify({ logger: true });

server.register(fastifyCors, {
  origin: '*',
});
server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: 5000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:5000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
