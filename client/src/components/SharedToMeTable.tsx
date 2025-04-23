import React from 'react'

type SharedToMeTableProps = {
    tasks: Array<{
      task: {
        name: string;
      };
      date: string;
      sharedBy: string;
    }>;
  };


const SharedToMeTable: React.FC<SharedToMeTableProps>  = ({ tasks }) => {
    return (
        <div>
            <table className="w-full bg-white shadow-md rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-3">Task</th>
                        <th className="text-left p-3">Shared At</th>
                        <th className="text-left p-3">Shared By</th>

                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-3">{task?.task?.name}</td>
                            <td className="p-3">
                                {new Date(task.date).toLocaleString()}
                            </td>

                            <td className="p-3">{task?.sharedBy}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SharedToMeTable