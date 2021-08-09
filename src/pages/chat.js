import { useEffect } from "react"
import { Switch, Route, useHistory, Redirect } from "react-router-dom"
import {
  MessageProvider,
  Layout,
  Header,
  ChatList,
  MessageList,
} from "../components"

export function Chat() {
  const { push } = useHistory()

  useEffect(() => {
    const listenExistChat = ({ code }) => {
      if (code === "Escape") {
        push("/chat")
      }
    }

    document.addEventListener("keydown", listenExistChat)

    return () => {
      document.removeEventListener("keydown", listenExistChat)
    }
  }, [push])

  return (
    <Switch>
      <Route path={["/chat/:roomId", "/chat"]}>
        <MessageProvider>
          {([state, actions]) => (
            <Layout header={<Header />} chats={<ChatList {...state} />}>
              {state.hasRoomById ? (
                <Route path="/chat/:roomId">
                  <MessageList {...state} {...actions}/>
                </Route>
              ) : (
                <Redirect to="/chat" />
              )}
              <Route exact={true} path="/chat">
                <h1>выберите сообщение</h1>
              </Route>
            </Layout>
          )}
        </MessageProvider>
      </Route>
      <Route path="*">
        <h1>такого чата нет</h1>
      </Route>
    </Switch>
  )
}
