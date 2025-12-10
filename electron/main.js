const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    backgroundColor: '#0f172a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'assets', 'mrds_icon.ico')
  });

  const devURL = 'http://localhost:5173';
  const prodIndex1 = path.join(__dirname, '..', 'frontend', 'dist', 'index.html');
  const prodIndex2 = path.join(process.resourcesPath || __dirname, 'app', 'frontend', 'dist', 'index.html');
  if (!app.isPackaged) {
    win.loadURL(devURL);
  } else {
    const candidates = [prodIndex1, prodIndex2];
    let loaded = false;
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        win.loadFile(c);
        loaded = true;
        break;
      }
    }
    if (!loaded) {
      win.loadURL('data:text/html,<h2>Erreur : frontend manquant</h2>');
    }
  }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
