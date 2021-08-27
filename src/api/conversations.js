import { db } from "./firebase"

export const updateConversation = (roomId, messageValue) =>
  db
    .ref("conversations")
    .child(roomId)
    .update({ title: roomId, value: messageValue })

export const getConversationsApi = () => db.ref("conversations").get()
