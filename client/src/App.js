import React, { useState } from 'react';
import ConnectToSelenium from './components/ConnectToSelenium';
import InteractWithElement from './components/InteractWithElement';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Selenium WebDriver Interface</h1>
        <ConnectToSelenium setConnected={setConnected} />
        {connected && <InteractWithElement />}
      </header>
    </div>
  );
}

export default App;