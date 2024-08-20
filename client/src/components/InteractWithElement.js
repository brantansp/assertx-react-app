// client/src/components/InteractWithElement.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const InteractWithElement = () => {
  const [url, setUrl] = useState('');
  const [xpath, setXpath] = useState('');
  const [browser, setBrowser] = useState('chrome');
  const [browserOptions, setBrowserOptions] = useState('');
  const [action, setAction] = useState('');
  const [actionValue, setActionValue] = useState('');
  const [message, setMessage] = useState('');

  const checkElement = useCallback(async () => {
    try {
      const options = browserOptions ? JSON.parse(browserOptions) : {};
      const response = await axios.post('http://localhost:5000/check-xpath', { url, xpath, browser, options, action, actionValue });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('Error: ' + error.message);
      }
    }
  }, [url, xpath, browser, browserOptions, action, actionValue]);

  useEffect(() => {
    fetch('/components/InteractWithElement.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('interact-with-element').innerHTML = html;
        document.getElementById('checkButton').onclick = checkElement;
        document.getElementById('url').oninput = (e) => setUrl(e.target.value);
        document.getElementById('xpath').oninput = (e) => setXpath(e.target.value);
        document.getElementById('browser').onchange = (e) => setBrowser(e.target.value);
        document.getElementById('browserOptions').oninput = (e) => setBrowserOptions(e.target.value);
        document.getElementById('action').onchange = (e) => setAction(e.target.value);
        document.getElementById('actionValue').oninput = (e) => setActionValue(e.target.value);
      })
      .catch(error => {
        setMessage('Error loading HTML: ' + error.message);
      });
  }, [checkElement]);

  return <div id="interact-with-element"></div>;
};

export default InteractWithElement;