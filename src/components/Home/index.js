import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../Urls';
import './index.css';
import Navbar from '../Navbar';
import { FiEdit } from "react-icons/fi";


const Home = () => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status is "Pending"
  const [allTodos, setAllTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null); // State to manage which todo is being edited

  useEffect(() => {
    fetchTodoData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTodoId) {
        // Update existing todo
        await axios.put(`${baseURL}/todo/${editTodoId}`, {
          description,
          status
        });
        console.log('Todo updated successfully');
        setEditTodoId(null); // Reset edit state
      } else {
        // Create new todo
        await axios.post(`${baseURL}/todo`, {
          description,
          status
        });
        console.log('Todo created successfully');
      }
      fetchTodoData(); // Fetch todos again to update the UI
      // Clear form fields
      setDescription('');
      setStatus('Pending'); // Reset status to default
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const fetchTodoData = async () => {
    try {
      const response = await axios.get(`${baseURL}/getAllTodos`);
      setAllTodos(response.data); // No need for update key anymore
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseURL}/todo/${id}`);
      console.log('Todo deleted successfully');
      fetchTodoData();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = (todo) => {
    setEditTodoId(todo.id); // Set the id of the todo being edited
    setDescription(todo.description); // Populate the description
    setStatus(todo.status); // Populate the status
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Completed':
        return 'status-completed';
      case 'Ongoing':
        return 'status-ongoing';
      default:
        return '';
    }
  };
  return (
    <div className="main">
      <nav className="menu-nav">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='form-control'>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter task description here'
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit">{editTodoId ? 'Update Todo' : 'Add Todo'}</button>
        </div>
      </form>
      
      <div className='todo-items-con'>
        {allTodos.map(each => (
          <div key={each.id}  className="menu-item">
            <div className='descriptionBody' >
            <p >{each.description}</p>
              </div>
            
        <div className='status-and-button' >
        <p  className={`status ${getStatusClassName(each.status)}`}>{each.status}</p>

      <button className="btn btn-green" type="button" onClick={() => editTodo(each)}>
        <FiEdit />
      </button>

           <button className="btn btn-amber" type="button" onClick={() => deleteTodo(each.id)}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
            </svg>
        </button>

            </div>
          </div>
        ))}
      </div>

      </nav>
    </div>
  );
};

export default Home;
