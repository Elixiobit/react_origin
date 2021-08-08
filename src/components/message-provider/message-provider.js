import { useState, useMemo } from "react"
import { useParams } from "react-router-dom"

export function MessageProvider({ children }) {
  const { roomId } = useParams()

  const [conversations] = useState([
    { title: "room1", value: "test 1" },
    { title: "room2", value: "test 2" },
  ])

  const [messages] = useState({
    room1: [{ message: "Привет !", author: "User", date: new Date() }],
    room2: [{ message: "Привет room2 !", author: "User", date: new Date() }],
  })

  const state = useMemo(() => {
    return {
      conversations,
      allMessages: messages,
      messages: messages[roomId] || [],
      value:
        conversations.find((conversation) => conversation.title === roomId)
          ?.value || "",
      hasRoomById: Object.keys(messages).some(room => room === roomId)
    }
  }, [conversations, messages, roomId])

  const actions = useMemo(() => {
    return {
      // ({ message, author }) =>
      sendMessage: () => {
        // нужно в messages - найти сообщение для обновления по roomId
        // запушить новое сообщение в найденный массив
      },
      // (value / event) =>
      handleChengeValue: () => {
        // нужно найти conversations по roomId
        // в найденной комнате обновить value
      },
    }
  }, [])

  return children([state, actions])
}
