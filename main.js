const { app, BrowserWindow, shell } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200, 
    height: 800, 
    minWidth: 800, 
    minHeight: 600,
    title: "RGAMER AI", 
    backgroundColor: "#0e0e11", 
    autoHideMenuBar: true,
    // Add webPreferences to allow Google/Firebase login
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false, // This often helps with CORS issues in OAuth popups
      allowRunningInsecureContent: true
    }
  });

  // URL set to your new domain
  mainWindow.loadURL('https://rgamerai.vercel.app');

  // Allow new windows (important for Google Login popups!)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // If it's a Google/Firebase auth link, let the app handle it normally as a popup
    if (url.includes('google.com') || url.includes('firebaseapp.com')) {
      return { action: 'allow' }; 
    }
    // Otherwise open in default browser (like Chrome)
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => { 
  if (process.platform !== 'darwin') app.quit(); 
});
