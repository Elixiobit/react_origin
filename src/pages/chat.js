import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Switch, Route, useHistory } from "react-router-dom"
import { Layout, ChatList, MessageList } from "../components"
import { subscribeToMessages } from "../store/messages"

export function Chat() {
  const { push } = useHistory()

  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(subscribeToMessages())
  }, [dispatch])

  return (
    <Switch>
      <Route path={["/chat/:roomId", "/chat"]}>
        <Layout chats={<ChatList />}>
          <Route path="/chat/:roomId">
            <MessageList />
          </Route>
          <Route exact={true} path="/chat">
            <h1>выберите сообщение</h1>
          </Route>
        </Layout>
      </Route>
      <Route path="*">
        <h1>такого чата нет</h1>
      </Route>
    </Switch>
  )
}
