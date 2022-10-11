'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

require('@electron/remote/main').initialize()

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    //width: 1080,
    //height: 600,
    show: false,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      //preload: path.join(__dirname,"preload.js")
    }
  });
  mainWindow.maximize();
  mainWindow.show();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

 /*  const MenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New project' ,          
          click: function () {
            createNewProject()
          }
        }
      ]
    }
   
  ]
  const menu = Menu.buildFromTemplate(MenuTemplate);
  Menu.setApplicationMenu(menu) */
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

//functions
/* function createNewProject(event){

  let filename;
  let content = "#include <stdio.h>";
      content += "\n";
      content += "int main()";
  
  
  dialog.showSaveDialog({}
    ).then(result => {
      filename = result.filePath;
      
      if (filename === undefined) {
        console.log('the user clicked the btn but didn\'t created a file');
        return ;
      }

      if (!fs.existsSync(filename)) {
        fs.mkdirSync(filename, {
          recursive: true
        });
      }

      let cFilename = filename+'\\'+'main.c'
     // console.log(cFilename)
      fs.writeFile(cFilename, content, (err) => {
        if (err) {
          console.log('an error ocurred with file creation ' + err.message);
          event.sender.send('fileCreated', 'error',err.message);
          //mainWindow.webContents.send('openCreatedFile', {'error': err.message});
          return;
        }
        console.log('FILE WAS SUCCESFULLY CREATED. '); 
       // mainWindow.webContents.send('openCreatedFile', {'success': 'File created successfully'});
       event.sender.send('fileCreated', 'success',cFilename);
        return;
      })
     
    }).catch(err => {
      console.log(err)
    })

    
}

function openProject(event){
  console.log("Open Project");
}


ipcMain.on('readFileContent', (event,path) => {
      //console.log(arg);
      //console.log(path);
      fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log("An error ocurred reading the file :" + err.message);
            return;
        }
        // Change how to handle the file content    
        console.log("path from main: "+path);              
        event.sender.send('getContentData', path,data);               
        
    });
})

ipcMain.on('createNewProject', (event, args) => {
  console.log(args);
  createNewProject(event);
 
})
ipcMain.on('openProject', (event, args) => {
  console.log(args);
  openProject(event);
 
})

ipcMain.on('runProject', (event, path) => {
  console.log(path);
  runProject(event,path);
 
}) */
