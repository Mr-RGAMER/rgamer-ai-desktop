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
  });

  // URL Fix (No 404 Error)
  mainWindow.loadURL('https://rgamerai.vercel.app');

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { 
  if (process.platform !== 'darwin') app.quit(); 
});
