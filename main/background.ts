import { app, ipcMain } from "electron"
import serve from "electron-serve"
import path from "path"
import { createWindow } from "./helpers"

const isProd: boolean = process.env.NODE_ENV === "production"

if (isProd) {
  serve({ directory: "app" })
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    icon: path.join(__dirname, "images", "icon512x512.png"),
  })

  const port = process.argv[2]
  const mainUrl = `http://localhost:${port}`
  if (isProd) {
    await mainWindow.loadURL("app://./home.html")
  } else {
    await mainWindow.loadURL(`${mainUrl}/home`)
    mainWindow.webContents.openDevTools()
  }
  ipcMain.on("test", async () => {
    const test = createWindow("test", {
      width: 600,
      height: 600,
    })
    if (isProd) {
      await test.loadURL("app://./test.html")
    } else {
      test.loadURL(`${mainUrl}/test`)
    }
  })
})()

app.on("window-all-closed", () => {
  app.quit()
})
