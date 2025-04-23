import { useState, useEffect } from 'react';
import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { createTask, getAllTasks, getAllUsers, getMyTasks, getSharedTasks, getSharedToMeTasks, shareTask } from '../api/task';
import { auth } from '../firebase/config';
import SharedByMeTable from '../components/SharedByMeTable';
import SharedToMeTable from '../components/SharedToMeTable';

export default function Dashboard() {
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState('');
    const [tab, setTab] = useState<'all' | 'mine' | 'shared' | 'shareToMe'>('all');
    const [tasks, setTasks] = useState<any[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');


    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleAddTask = async () => {
        if (newTask.trim()) {
            const user = auth.currentUser;
            const userId = user?.uid;
            await createTask(newTask, userId);
            setNewTask('');
            await loadTasks()
        }
    };

    const loadTasks = async () => {
        const user = auth.currentUser;
        const userId = user?.uid;
        if (!userId) return;

        if (tab === 'all') {
            const fetchedTasks = await getAllTasks(); // Get all tasks
            setTasks(fetchedTasks?.tasks);
        } else if (tab === 'mine') {
            const fetchedTasks = await getMyTasks(userId); // Get user's own tasks
            setTasks(fetchedTasks?.formattedTasks);
        } else if (tab === 'shared') {
            const fetchedTasks = await getSharedTasks(userId); // Get tasks shared with the user

            setTasks(fetchedTasks?.sharedTasks);
        } else {
            const fetchedTasks = await getSharedToMeTasks(userId); // Get tasks shared with the user

            setTasks(fetchedTasks?.sharedTasks);
        }
    };



    useEffect(() => {
        loadTasks();
        console.log(tab);
        
    }, [tab]);


    const handleShare = async () => {
        if (!selectedTask || !selectedUser) return;
        console.log(auth.currentUser?.uid);
        console.log(selectedTask.id, selectedUser, auth.currentUser?.uid);

        shareTask(selectedTask.id, selectedUser, auth.currentUser?.uid)

        setShowModal(false);
        setSelectedUser('');
        setSelectedTask(null);
    };

    const handleOpenShareModal = async (task: any) => {

        const currentUserEmail = auth.currentUser?.email;
        const response = await getAllUsers()
        const allUsers = response

        console.log(allUsers)

        const filteredUsers = allUsers?.filter((user: any) => user.email !== currentUserEmail);

        setUsers(filteredUsers);
        setSelectedTask(task);
        setShowModal(true);
    };



    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                {/* <h2 className="">Dashboard</h2> */}
                <span className='text-2xl font-semibold'>{auth.currentUser?.email}</span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Task Input */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a task..."
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-4">
                {['all', 'mine', 'shared', 'shareToMe'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t as 'all' | 'mine' | 'shared' | 'shared_to_me')}
                        className={`px-3 py-1 rounded ${tab === t ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {t === 'all'
                            ? 'All Tasks'
                            : t === 'mine'
                                ? 'My Tasks'
                                : t === 'shared'
                                    ? 'Shared by Me'
                                    : 'Shared to Me'
                        }

                    </button>
                ))}
            </div>

            {tab === 'shared' ? <SharedByMeTable tasks={tasks} /> : <></>}
            {tab === 'shareToMe' ? <SharedToMeTable tasks={tasks} /> : <></>}


            {/* Task Table */}
            {tab === 'all' || tab === 'mine' ?
                <table className="w-full bg-white shadow-md rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Task</th>
                            <th className="text-left p-3">Created At</th>
                            <th className="text-left p-3">Created By</th>
                            <th className="text-left p-3">Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{task.name}</td>
                                <td className="p-3">
                                    {new Date(task.createdAt).toLocaleString()}
                                </td>

                                <td className="p-3">{task.createdBy}</td>

                                <td className="p-3">
                                    <button
                                        className="bg-black text-white text-sm px-2 py-1 rounded-md"
                                        onClick={() => handleOpenShareModal(task)}
                                    >
                                        Share
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                null
            }



            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-4">Share Task</h3>
                        <label className="block mb-2">Select user:</label>
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">-- Select a user --</option>
                            {users.map((user) => (
                                <option key={user._id} value={user.uid}>
                                    {user.email}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-1 bg-gray-300 rounded"
                                onClick={() => {
                                    setShowModal(false)
                                    setSelectedTask(null)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-1 bg-blue-500 text-white rounded"
                                onClick={handleShare}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
