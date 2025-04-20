import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AllTasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fecthdata = async () => {
      await axios.get("http://localhost:8000/api/getall")
        .then(res => {
          console.log(res.data.task);
          setTasks(res.data.task)
        })
        .catch(err => (console.log(err)))
    }
    fecthdata()
  }, [])

  const deleteUser = async (taskID) => {
    await axios.delete(`http://localhost:8000/api/delete/${taskID}`)
      .then((res) => {
        setTasks((prevTask) => prevTask.filter((tasks) => tasks._id !== taskID))
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const completedTasks = async (taskID) => {
    await axios.patch(`http://localhost:8000/api/completed/${taskID}`)
      .then((res) => {
        setTasks((prevTask) => prevTask.filter((tasks) => tasks._id !== taskID))
      })
      .catch((err) => console.log(err))
  }

  const updateTask = async (taskID) => {
    await axios.put(`http://localhost:8000/api/update/${taskID}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-semibold mb-4 text-center'>📋 Task List</h1>
        <div className='flex justify-between mb-6'>
          <Link to={"/add"} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">➕ Add Task</Link>
          <Link to={"/completed"} className='text-blue-600 hover:underline'>✅ View Completed</Link>
        </div>
        <table className='w-full text-left border-collapse'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-2 px-4'>S.No</th>
              <th className='py-2 px-4'>Task</th>
              <th className='py-2 px-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => {
              return (
                <tr key={task._id} className='border-b hover:bg-gray-50'>
                  <td className='py-2 px-4'>{index + 1}</td>
                  <td className='py-2 px-4'>
                    <Link to={`/update/${task._id}`} className='text-blue-500 hover:underline'>
                      {task.task}
                    </Link>
                  </td>
                  <td className='py-2 px-4'>
                    <button onClick={() => completedTasks(task._id)} className='text-green-600 hover:text-green-800 font-medium mr-4 rounded px-2 py-1 transition'>
                      ✔ Complete
                    </button>
                    <button onClick={() => deleteUser(task._id)} className='text-red-600 hover:text-red-800 font-medium rounded px-2 py-1 transition'>
                      ✖ Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllTasks