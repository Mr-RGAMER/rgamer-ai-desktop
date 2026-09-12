const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200, 
    height: 800, 
    minWidth: 800, 
    minHeight: 600,
    title: "RGAMER AI", 
    backgroundColor: "#0e0e11", 
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  });

  mainWindow.loadURL('https://rgamerai.vercel.app');

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.includes('google.com') || url.includes('firebaseapp.com')) {
      return { action: 'allow' }; 
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => { 
  if (process.platform !== 'darwin') app.quit(); 
});
