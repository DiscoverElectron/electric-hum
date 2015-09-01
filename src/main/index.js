'use strict'

const path = require('path')
const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray
const BrowserWindow = electron.BrowserWindow

let tray = null
let win = null

const createMenu = () => {
  const appMenu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            win.destroy()
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(appMenu)
}

const createTray = () => {
  const iconPath = path.resolve(__dirname, '../../resources/IconTemplate.png')

  tray = new Tray(iconPath)

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Preferences...',
      click: () => {
        win.show()
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        win.destroy()
      }
    }
  ])
  tray.setContextMenu(trayMenu)
}

const createWindow = () => {
  const winUrl = 'file://' + path.resolve(__dirname, '../renderer/index.html')

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })
  win.loadURL(winUrl)

  win.on('close', (evt) => {
    evt.preventDefault()
    win.hide()
  })

  win.on('closed', () => {
    tray = null
    win = null
  })
}

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
  createMenu()
  createTray()
  createWindow()
})
