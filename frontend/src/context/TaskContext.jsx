import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

// Create context
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [updatedTask, setUpdatedTask] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch tasks when user is authenticated
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/assign`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
    setLoading(false);
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/`,
        taskData
      );
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Update a task
  const updateTask = async (id, taskData) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`,
        taskData
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        updateIndex,
        setUpdateIndex,
        updatedTask,
        setUpdatedTask,
        tasks,
        loading,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use TaskContext
const contextApi = () => {
  return useContext(TaskContext);
};

export { contextApi, TaskProvider };
