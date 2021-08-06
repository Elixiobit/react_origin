import { ThemeProvider, createTheme } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { Layout, Header, ChatList, MessageList } from "./components"
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
    <ThemeProvider theme={theme}>
      <Layout
        header={<Header />}
        chats={<ChatList />}
        messages={<MessageList />}
      />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
