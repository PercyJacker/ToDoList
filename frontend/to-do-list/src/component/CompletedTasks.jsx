import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CompletedTasks = () => {
    const [completedTask, setCompletedTask] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8000/api/completed")
                .then((res) => {
                    console.log(res.data);
                    setCompletedTask(res.data);
                })
                .catch((err) => console.log(err))
        }
        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">✅ Completed Tasks</h1>
                {completedTask.length > 0 ? (
                  <table className="w-full border-collapse rounded-md overflow-hidden">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-slate-700">S.No.</th>
                        <th className="py-3 px-4 text-left text-slate-700">Task</th>
                        <th className="py-3 px-4 text-left text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedTask.map((task, index) => (
                        <tr
                          key={task._id || index}
                          className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          <td className="py-2 px-4">{index + 1}</td>
                          <td className="py-2 px-4">{task.task || "no tasks"}</td>
                          <td className="py-2 px-4 text-green-600 font-medium">Completed</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center text-gray-500 py-10 text-lg">No completed tasks found.</div>
                )}
            </div>
        </div>
    )
}

export default CompletedTasks