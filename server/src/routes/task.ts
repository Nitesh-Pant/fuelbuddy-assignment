import { FastifyInstance } from 'fastify';
import Task from '../models/Task';
import User from '../models/User';

export async function taskRoutes(fastify: FastifyInstance) {
    fastify.post('/addTask', async (req, reply) => {
        try {

            const body = req.body as { name: string; userId: string };

            const { name, userId } = body;

            if (!name || !userId) {
                return reply.status(400).send({ message: 'Name and userId required' });
            }

            const task = new Task({ name, userId });
            await task.save();
            reply.send({ message: 'Task created', task });
        } catch (err) {
            console.error(err);
            reply.status(500).send({ message: 'Failed to create task' });
        }
    });


    fastify.get('/getAllTasks', async (req, reply) => {
        try {
            const tasks = await Task.find().sort({ createdAt: -1 });

            const formattedTasks = await Promise.all(
                tasks.map(async (task) => {
                    const user = await User.findOne({ uid: task.userId }); // manually fetch user by UID

                    return {
                        id: task._id,
                        name: task.name,
                        createdAt: task.createdAt,
                        createdBy: user?.email || 'Unknown', // fallback if user not found
                    };
                })
            );

            reply.send({ tasks: formattedTasks });
        } catch (err) {
            console.error(err);
            reply.status(500).send({ message: 'Failed to fetch tasks' });
        }
    });


    // Get tasks created by the logged-in user
    fastify.get('/tasks/my/:userId', async (req: any, reply) => {
        try {
            const tasks = await Task.find({ userId: req.params.userId })
                .populate('userId', 'email')
                .sort({ createdAt: -1 });

            const formattedTasks = await Promise.all(
                tasks.map(async (task) => {
                    const user = await User.findOne({ uid: task.userId }); // manually fetch user by UID

                    return {
                        id: task._id,
                        name: task.name,
                        createdAt: task.createdAt,
                        createdBy: user?.email || 'Unknown', // fallback if user not found
                    };
                })
            );
            reply.send({ formattedTasks });
        } catch (error) {
            reply.status(500).send({ message: 'Failed to fetch tasks' });
        }
    });


    // Get tasks shared with the logged-in user
    fastify.get('/tasks/shared/:userId', async (req: any, reply) => {
        try {
            const tasks = await Task.find({ 'sharedWith': req.params.userId })
                .populate('userId', 'email')
                .sort({ createdAt: -1 });
            reply.send({ tasks });
        } catch (error) {
            reply.status(500).send({ message: 'Failed to fetch tasks' });
        }
    });
}
