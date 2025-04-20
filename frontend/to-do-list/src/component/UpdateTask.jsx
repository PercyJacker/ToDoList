import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const UpdateTask = () => {
    //import usenavigate, useparam, link
    //const empty tasks ,usestate , id ,
    //make inputhandler to update settask
    //make useeffect to getone task
    //make submitform  to submit task
    //make a form to input task
    const navigate = useNavigate()

    const tasks ={
        task:" "
    }

    const {id}=useParams();
    const [task,setTask]=useState(tasks)

// debugger
    const inputHandler =(e)=>{
        const {name , value} =e.target;
        setTask({...task,[name]:value})
        console.log(task);

    }


    useEffect(()=>{
        const fecthdata = async()=>{
            await axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((res)=>{
                console.log(res.data.task);
                setTask(res.data.task)
                // navigate("/")
            })
            .catch((err)=>console.log(err))
        }
        fecthdata()
    },[id])




    const submitForm = async(e)=>{
        e.preventDefault();

        await axios.patch(`http://localhost:8000/api/update/${id}`,task)
        .then((res)=>{
            console.log(id);
            console.log(res)
            navigate("/")
        })
        .catch((err)=>console.log(err))
    }

    
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">✏️ Update Task</h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">
              Task Name:
            </label>
            <input
              type="text"
              onChange={inputHandler}
              value={task.task}
              id="task"
              name="task"
              autoComplete="off"
              placeholder="Update your task..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              ✅ Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask