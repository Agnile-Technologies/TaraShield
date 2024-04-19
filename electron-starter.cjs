const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs-extra');
const path = require('path');

async function isDevMode() {
  try {
    const isDev = await import('electron-is-dev');
    return isDev.default;
  } catch (error) {
    console.error("Error determining development mode:", error.message);
    return false;
  }
}

async function createWindow() {
  const isDev = await isDevMode();

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'public/preload.cjs'),
    },
  });

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: Object.assign({
        "Content-Security-Policy": ["default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'; style-src 'self' 'unsafe-inline';"]
      }, details.responseHeaders)
    });
  });

  try {
    await win.loadURL(
      isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, './dist/index.html')}`
    );
  } catch (error) {
    console.error("Error loading URL:", error.message);
  }

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow).catch(error => {
  console.error("Error during app initialization:", error.message);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow().catch(error => {
      console.error("Error recreating window:", error.message);
    });
  }
});

ipcMain.handle('select-directory', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (canceled) {
    return null;
  } else {
    return filePaths[0];
  }
});

ipcMain.handle('create-project', async (event, { name, description, directory }) => {
  const filePath = path.join(directory, `${name}.ag`);
  try {
    await fs.writeJson(filePath, { name, description, assets: [], threats: [] });
    console.log(`Project ${name} created at ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Failed to create project file:', error);
    return null;
  }
});

ipcMain.handle('open-project', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'TaraShield Project Files', extensions: ['ag'] }]
  });
  if (canceled) {
    return null;
  } else {
    try {
      const data = await fs.readJson(filePaths[0]);
      console.log(`Project ${data.name} opened from ${filePaths[0]}`);
      return data;
    } catch (error) {
      console.error('Failed to open project file:', error);
      return null;
    }
  }
});