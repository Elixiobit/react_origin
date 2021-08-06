import { ThemeProvider, createTheme } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Chat } from "./pages"
import "./global.css"

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/chat" component={() => <Chat />} />
          <Route path="*" component={() => <h1>404 page</h1>} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
