import { FastifyInstance } from 'fastify';
import { auth } from '../firebase/config';
import User from '../models/User';
import { taskRoutes } from './task';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/api/user', async (request, reply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) return reply.status(401).send({ message: 'No token' });

      // Verify token with Firebase Admin
      const decoded = await auth.verifyIdToken(token);
      const { uid, email } = decoded;

      // Save to MongoDB if not exists
      const existing = await User.findOne({ uid });
      if (!existing) {
        const newUser = new User({ email, uid });
        await newUser.save();
      }

      reply.send({ message: 'User synced to DB' });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: 'Failed to sync user' });
    }
  });


  fastify.get('/api/allUsers', async (request, reply) => {
    try {
      const users = await User.find();

      reply.send(users);
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: 'Failed to sync user' });
    }
  });
}
