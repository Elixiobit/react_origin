import debounce from "lodash.debounce"
import { db } from "../../api/firebase"
import { handleChangeMessageValue } from "./actions"
import { SUBSCRIBE_CONVERSATIONS } from "./types"

export const subscribeToConversations = () => (dispatch) => {
  db.ref("conversations")
    .get()
    .then((snapshot) => {
      const conversations = []

      snapshot.forEach((snap) => {
        conversations.push(snap.val())
      })

      dispatch({ type: SUBSCRIBE_CONVERSATIONS, payload: conversations })
    })
  // db.ref("conversations").on("value", (snapshot) => {
  //   const conversations = []

  //   snapshot.forEach((snap) => {
  //     console.log("snap.val()", snap.val())

  //     conversations.push(snap.val())
  //   })

  //   dispatch({ type: SUBSCRIBE_CONVERSATIONS, payload: conversations })
  // })
}

const cb = debounce(async ({ roomId, message }) => {
  console.log("qwdqw")
  await db
    .ref("conversations")
    .child(roomId)
    .update({ title: roomId, value: message })
}, 500)

export const handleChangeMessageValueThunk = (message, roomId) => {
  return (dispatch) => {
    try {
      cb({ message, roomId })
      dispatch(handleChangeMessageValue(message, roomId))
    } catch {
      console.log("error")
    }
  }
}
