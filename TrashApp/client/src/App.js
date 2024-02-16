import React, {useEffect, useState} from 'react';
import HomePage from './pages/HomePage';
import { AppRoutes } from './Routes';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  },  [])

  return (
    <div>
      <p>{"this is form the App.js file"}</p>
      <AppRoutes />
    </div>
  )
}

export default App



    /*{(typeof backendData.users === 'undefined') ? (
      <p>Loading...</p>
    ): (
      backendData.users.map((user, i) => (
        <p key={i}>{user}</p>
      ))
    )}*/