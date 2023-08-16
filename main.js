/**
 * Webian Shell Touch.
 * 
 * Main script starts system chrome.
 */
 const {app, BrowserWindow} = require('electron');
 const path = require('path');

 function start() {
    // Create the main window
    const mainWindow = new BrowserWindow({
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
        contextIsolation: false
      }
    });

    // Load system chrome into main window
    console.log('Starting system chrome...');
    mainWindow.loadURL('file://' + path.join(__dirname, 'chrome/index.html'));

    // Uncomment the following line to open DevTools
    //mainWindow.webContents.openDevTools();
 }

 app.on('ready', start);