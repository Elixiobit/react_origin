import { nanoid } from "nanoid"
import { db } from "../../api/firebase"
import { clearMessageValue } from "../conversations"
import { UPDATED_MESSAGES } from "../types"
import { sendMessage, editMessage } from "./actions"
import { SUBSCRIBE_MESSAGES } from "./types"

export const sendMessageWithThunk =
  ({ author, message }, roomId) =>
  async (dispatch) => {
    // запросы на сервер
    // все сайд еффекты

    try {
      await db
        .ref("messages")
        .child(roomId)
        .push({ id: nanoid(), author, message })

      dispatch(sendMessage({ author, message }, roomId))
    } catch {
      console.log("error")
    }

    // dispatch(sendMessage(message, roomId))
    // dispatch(clearMessageValue(roomId))

    // if (message.author === "User") {
    //   setTimeout(
    //     () =>
    //       dispatch(
    //         sendMessage(
    //           { author: "Bot", message: "Hello from bot thunk" },
    //           roomId,
    //         ),
    //       ),
    //     1500,
    //   )
    // }
  }

export const editMessageThunk =
  (messageValue, roomId, updateMessageId) => (dispatch) => {
    dispatch(editMessage(messageValue, roomId, updateMessageId))
    dispatch({ type: UPDATED_MESSAGES })
    dispatch(clearMessageValue(roomId))
  }

export const subscribeToMessages = () => (dispatch) => {
  db.ref("messages")
    .get()
    .then((snapshot) => {
      const messages = {}

      snapshot.forEach((snap) => {
        messages[snap.key] = Object.values(snap.val())
      })

      dispatch({ type: SUBSCRIBE_MESSAGES, payload: messages })
    })
  // db.ref("messages").on("value", (snapshot) => {
  //   const messages = {}

  //   snapshot.forEach((snap) => {
  //     messages[snap.key] = Object.values(snap.val())
  //   })

  //   dispatch({ type: SUBSCRIBE_MESSAGES, payload: messages })
  // })
}
