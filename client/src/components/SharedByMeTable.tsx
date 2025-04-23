import React from 'react'

type SharedByMeTableProps = {
    tasks: Array<{
      task: {
        name: string;
      };
      date: string;
      sharedTo: string;
    }>;
  };


const SharedByMeTable: React.FC<SharedByMeTableProps>  = ({ tasks }) => {
    return (
        <div>
            <table className="w-full bg-white shadow-md rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-3">Task</th>
                        <th className="text-left p-3">Shared At</th>
                        <th className="text-left p-3">Shared To</th>

                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-3">{task?.task?.name}</td>
                            <td className="p-3">
                                {new Date(task.date).toLocaleString()}
                            </td>

                            <td className="p-3">{task?.sharedTo}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SharedByMeTable