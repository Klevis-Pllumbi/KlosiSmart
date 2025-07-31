import React, { useEffect, useState } from 'react';
import api from './api/axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/test')
        .then(response => setMessage(response.data))
        .catch(error => console.error("Error:", error));
  }, []);

  return (
      <div>
        <h1>{message || "Loading..."}</h1>
      </div>
  );
}

export default App;
