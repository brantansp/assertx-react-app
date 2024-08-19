// src/components/InteractWithElement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InteractWithElement = () => {
  const [url, setUrl] = useState('');
  const [xpath, setXpath] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/components/InteractWithElement.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('interact-with-element').innerHTML = html;
        document.getElementById('checkButton').onclick = checkElement;
        document.getElementById('url').oninput = (e) => setUrl(e.target.value);
        document.getElementById('xpath').oninput = (e) => setXpath(e.target.value);
      });
  }, []);

  const checkElement = async () => {
    try {
      const response = await axios.post('http://localhost:5000/check-xpath', { url, xpath });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return <div id="interact-with-element"></div>;
};

export default InteractWithElement;