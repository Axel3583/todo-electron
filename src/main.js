const { app, BrowserWindow, ipcMain } = require("electron"); // CommonJS

const ipc = ipcMain;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("src/template/index.html");
  win.webContents.openDevTools();

  ipc.on("Add_Data", (e, data) => {
    var Datastore = require("nedb"),
      db = new Datastore({
        filename: "src/database/datafile.db ",
        autoload: true,
      });
    db.loadDatabase(function (err) {
      db.insert(data, function (err, newData) {
        console.log("data created :", newData);
        win.reload();
      });
      console.log("err :", err);
    });
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  app.quit();
});
