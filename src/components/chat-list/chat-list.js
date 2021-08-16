import { List } from "@material-ui/core"
import { memo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Chat } from "./chat"

const selector = (state) => {
  return state.conversations.conversations
}

export const ChatList = memo(() => {
  const { roomId } = useParams()
  const conversations = useSelector(selector)

  return (
    <List component="nav">
      {conversations.map((chat, index) => {
        return (
          <Chat
            key={index}
            title={chat.title}
            selected={roomId === chat.title}
          />
        )
      })}
    </List>
  )
})
