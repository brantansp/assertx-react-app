const express = require('express');
const cors = require('cors');
const { Builder, By, until } = require('selenium-webdriver');
const app = express();
const port = 5000;

let driver;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/connect', async (req, res) => {
  const { ip, port } = req.body;
  console.log(`Received connect request to ${ip}:${port}`);
  try {
    driver = await new Builder().usingServer(`http://${ip}:${port}/wd/hub`).forBrowser('chrome').build();
    res.json({ message: '' });
  } catch (error) {
    console.error('Connection Error:', error);
    res.status(500).json({ message: 'Failed to connect to Selenium server', error: error.message });
  }
});

app.post('/disconnect', async (req, res) => {
  try {
    if (driver) {
      await driver.quit();
      driver = null;
      res.json({ message: 'Disconnected from Selenium server' });
    } else {
      res.status(400).json({ message: 'No active connection to disconnect' });
    }
  } catch (error) {
    console.error('Disconnection Error:', error);
    res.status(500).json({ message: 'Failed to disconnect from Selenium server', error: error.message });
  }
});

app.post('/check-xpath', async (req, res) => {
  const { url, xpath } = req.body;
  try {
    await driver.get(url);
    const element = await driver.findElement(By.xpath(xpath));
    await driver.wait(until.elementIsVisible(element), 5000);
    res.json({ message: 'Element is interactable' });
  } catch (error) {
    console.error('XPath Check Error:', error);
    res.status(500).json({ message: 'Element is not interactable', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});