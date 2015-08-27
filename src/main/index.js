'use strict'

const path = require('path')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let win = null

const createWindow = () => {
  const winUrl = 'file://' + path.resolve(__dirname, '../renderer/index.html')

  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadURL(winUrl)

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
  createWindow()
})
