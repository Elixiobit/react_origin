import { ThemeProvider, createTheme } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"

const theme = createTheme({
  dark: {
    color: "#000",
  },
  light: {
    color: "#fff",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App count={1} users={[{ id: "string" }]} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
