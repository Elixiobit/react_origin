import { nanoid } from "nanoid"
import { db } from "./firebase"

export const sendMessageApi = ({ author, message }, roomId) =>
  db.ref("messages").child(roomId).push({ id: nanoid(), author, message })

export const getMessaagesApi = () => db.ref("messages").get()
