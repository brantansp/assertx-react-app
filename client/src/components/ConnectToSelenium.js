// client/src/components/ConnectToSelenium.js
import React, { useState } from 'react';
import axios from 'axios';
import './ConnectToSelenium.css'; // Import the CSS file

const ConnectToSelenium = ({ setConnected }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectToSelenium = async () => {
    console.log('Connect button clicked'); // Debug log
    console.log(`Connecting to ${ip}:${port}`); // Debug log

    if (!ip || !port) {
      setMessage('IP and Port must be provided');
      return;
    }

    if (ip.trim() === '' || port.trim() === '') {
      setMessage('IP and Port cannot be empty');
      return;
    }

    setIsConnecting(true);

    try {
      const response = await axios.post('http://localhost:5000/connect', { ip, port });
      console.log('Response:', response); // Debug log
      setMessage(response.data.message);
      setIsConnected(true);
      setIsConnecting(false);
      setConnected(true);
    } catch (error) {
      console.error('Error:', error); // Debug log
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('Error: ' + error.message);
      }
      setIsConnecting(false);
    }
  };

  const disconnectFromSelenium = async () => {
    console.log('Disconnect button clicked'); // Debug log
    try {
      const response = await axios.post('http://localhost:5000/disconnect');
      console.log('Response:', response); // Debug log
      setMessage(response.data.message);
      setIsConnected(false);
      setConnected(false);
    } catch (error) {
      console.error('Error:', error); // Debug log
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      {isConnected ? (
        <div className="connected-container">
          <div className="connected-circle"></div>
          <p>Connected to {ip}:{port}</p>
          <button id="disconnectButton" onClick={disconnectFromSelenium}>Disconnect</button>
        </div>
      ) : (
        <div className="input-container">
          <input type="text" id="ipAddress" placeholder="IP Address" onChange={(e) => setIp(e.target.value)} />
          <input type="text" id="port" placeholder="Port" onChange={(e) => setPort(e.target.value)} />
          <button id="connectButton" onClick={connectToSelenium} disabled={isConnecting}>
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};

export default ConnectToSelenium;