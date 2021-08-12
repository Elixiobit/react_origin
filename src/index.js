import { createTheme } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Header } from "./components"
import { DefaultThemeProvider } from "./components/theme-context"
import { Chat, Profile } from "./pages"
import { store } from "./store"
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
    <Provider store={store}>
      <BrowserRouter>
        <DefaultThemeProvider themes={themes} initialTheme="light">
          <Header />
          <Switch>
            <Route path="/chat" component={() => <Chat />} />
            <Route path="/profile" component={() => <Profile />} />
            <Route path="*" component={() => <h1>404 page</h1>} />
          </Switch>
        </DefaultThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)
