'use strict'

const path = require('path')
const electron = require('electron')
const app = electron.app
const Tray = electron.Tray
const BrowserWindow = electron.BrowserWindow

let tray = null
let win = null

const createTray = () => {
  const iconPath = path.resolve(__dirname, '../../resources/IconTemplate.png')

  tray = new Tray(iconPath)

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  })

  tray.on('double-click', () => {
    win.destroy()
  })
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
  createTray()
  createWindow()
})
