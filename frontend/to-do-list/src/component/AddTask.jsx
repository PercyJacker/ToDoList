import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
  const navigate = useNavigate();
  const tasks = {
    task: ""
  }

  const [task, setTasks] = useState(tasks)

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTasks({ ...task, [name]: value })
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", task)
      .then((res) => {
        console.log(res);
        navigate('/')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">➕ Add New Task</h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <input
              type="text"
              onChange={inputHandler}
              autoComplete='off'
              name='task'
              placeholder='What needs to be done?'
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              ➕ Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTask