import { createTheme } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { firebaseApp, db } from "./api/firebase"
import { Header, PublicRoute, PrivateRoute } from "./components"
import { DefaultThemeProvider } from "./components/theme-context"
import { Chat, Profile, Gist, Login, SignUp } from "./pages"
import { store, persistore } from "./store"

import "./global.css"

const themes = {
  dark: createTheme({
    color: "#000",
  }),
  light: createTheme({
    color: "#fff",
  }),
}

const App = () => {
  const [session, setSession] = useState(null)

  const addMessageToRoom = () => {
    db.ref("messages")
      .child("room2")
      .push({ id: 1, author: "User", message: "room2" })
  }
  const addConversation = () => {
    db.ref("conversations").child("room2").set({ title: "room2", value: "" })
  }
  const addConversationValue = () => {
    db.ref("conversations")
      .child("room1")
      .update({ title: "room2", value: "hello test" })
  }

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setSession(user)
      } else {
        setSession(null)
      }
    })
  }, [])

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          <BrowserRouter>
            <DefaultThemeProvider themes={themes} initialTheme="light">
              <Header session={session} />
              <button onClick={addMessageToRoom}>add</button>
              <button onClick={addConversation}>addConversation</button>
              <button onClick={addConversationValue}>
                addConversationValue
              </button>
              <Switch>
                <PrivateRoute
                  path="/chat"
                  component={Chat}
                  authenticated={session}
                />
                <PrivateRoute
                  path="/profile"
                  component={Profile}
                  authenticated={session}
                />
                <PrivateRoute
                  path="/gists"
                  component={Gist}
                  authenticated={session}
                />
                <PublicRoute
                  path="/login"
                  component={Login}
                  authenticated={session}
                />
                <PublicRoute
                  path="/signup"
                  component={SignUp}
                  authenticated={session}
                />
                <Route path="*" component={() => <h1>404 page</h1>} />
              </Switch>
            </DefaultThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
