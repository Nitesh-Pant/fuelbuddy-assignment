import { FastifyInstance } from 'fastify';
import Shared from '../models/Shared';
import User from '../models/User';

export async function shareRoutes(fastify: FastifyInstance) {

    fastify.post('/shareTask', async (req, reply) => {
        try {
            const body = req.body as { taskId: string, sharedBy: string; sharedTo: string };

            const { taskId, sharedBy, sharedTo } = body;

            if (!sharedBy || !sharedTo || !taskId) {
                return reply.status(400).send({ message: 'taskId, sharedTo and sharedBy are required' });
            }

            const sha = new Shared({ taskId, sharedBy, sharedTo });
            await sha.save();

            reply.send({ message: 'Task shared successfully', shared: sha });
        } catch (err) {
            console.error(err);
            reply.status(500).send({ message: 'Failed to share task' });
        }
    });


    // share by loggin user
    fastify.get('/shareByMe/:id', async (req: any, reply) => {
        try {
            const sharedByUid = req.params.id;

            // Fetch all share records where the user is the one who shared
            const sharedTasks = await Shared.find({ sharedBy: sharedByUid }).sort({ createdAt: -1 }).populate('taskId');;

            const formatted = await Promise.all(
                sharedTasks.map(async (record) => {
                    const sharedByUser = await User.findOne({ uid: record.sharedBy });
                    const sharedToUser = await User.findOne({ uid: record.sharedTo });

                    return {
                        id: record._id,
                        task: record.taskId,
                        sharedBy: sharedByUser?.email || 'Unknown',
                        sharedTo: sharedToUser?.email || 'Unknown',
                        date: record.createdAt,
                    };
                })
            );

            reply.send({ sharedTasks: formatted });
        } catch (err) {
            console.error(err);
            reply.status(500).send({ message: 'Failed to fetch shared tasks' });
        }
    });



}
