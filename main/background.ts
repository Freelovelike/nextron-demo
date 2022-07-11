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
  }

  ipcMain.on("newWindow", async (event, { path, query }) => {
    const test = createWindow(path, {
      width: 600,
      height: 600,
      parent: mainWindow,
      show: false,
    })
    if (isProd) {
      await test.loadURL(`app://./${path}.html?a=1`)
    } else {
      test.loadURL(`${mainUrl}/${path}?a=ds`)
    }
    test.on("ready-to-show", () => {
      test.show()
    })
  })
})()

app.on("window-all-closed", () => {
  app.quit()
})
