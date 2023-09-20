import React, { useState } from 'react';
import { Router, Route, Routes, useLocation } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile';
import Weather from './components/Weather/Weather';
import TaskList from "./components/TaskList/TaskList";
import Calculator from './components/Calculator/Calculator';
import {Authentication} from './components/Gettingin/Authentication';


function App() {
  const route = useLocation()
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }
  return (
    <>
      {route.pathname === '/' || route.pathname==="/signup" ? (
        <Authentication />
      ):
        <UserProfile />
      }
      <Routes>
        <Route path='/Home' element={<TaskList />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/Weather" element={<Weather />} />
      </Routes>
    </>
  );
}

export default App;
