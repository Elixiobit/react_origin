import { List, Button } from "@material-ui/core"
import { memo, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { subscribeToConversations } from "../../store/conversations"
import { AddContactModal } from "../add-contact-modal"
import { Chat } from "./chat"

const selector = (state) => {
  return state.conversations.conversations
}

export const ChatList = memo(() => {
  const { roomId } = useParams()
  const conversations = useSelector(selector)
  const [isOpen, setModal] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(subscribeToConversations())
  }, [dispatch])

  return (
    <>
      <div>
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
      </div>

      <AddContactModal isOpen={isOpen} onClose={() => setModal(false)} />

      <Button
        variant="contained"
        fullWidth={true}
        onClick={() => setModal(true)}
      >
        Добавить чат
      </Button>
    </>
  )
})
