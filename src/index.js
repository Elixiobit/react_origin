import { createTheme } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { DefaultThemeProvider } from "./components/theme-context"
import { Chat } from "./pages"
import "./global.css"

const themes = {
  dark: createTheme({
    color: "#000",
  }),
  light: createTheme({
    color: "#fff",
  }),
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DefaultThemeProvider themes={themes} initialTheme="dark">
        <Switch>
          <Route path="/chat" component={() => <Chat />} />
          <Route path="*" component={() => <h1>404 page</h1>} />
        </Switch>
      </DefaultThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
