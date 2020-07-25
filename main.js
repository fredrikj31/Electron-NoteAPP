const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require('path');
const os = require('os');
const storage = require('electron-json-storage');

let win;

Menu.setApplicationMenu(null);

function createWindow() {
	win = new BrowserWindow({
		width: 400,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	//Disable resizing Disabled for develop reasons
	//win.setResizable(false);

	// Set icon of window
	win.setIcon(path.join(__dirname, '/note-icon.jpg'));

	//Loads html template
	win.loadFile(path.join(__dirname, '/templates/index.html'));

	//Setting the window to null, when all windows are closed
	win.on("closed", () => {
		win = null;
	});
}

app.on("ready", () => {
	createWindow();
	
	//Developer tools
	globalShortcut.register("CommandOrControl+X", () => {
		win.webContents.openDevTools();
		console.log("Dev Tools opened!");
	});
	globalShortcut.register("CommandOrControl+R", () => {
		win.reload();
		console.log("Page reloaded!");
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on('will-quit', () => {
	// Unregister all shortcuts.
	globalShortcut.unregisterAll();
})

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});
