import { FastifyPluginAsync } from 'fastify';

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (req, reply) => {
    return { message: 'Fastify is working!' };
  });
};

export default routes;
