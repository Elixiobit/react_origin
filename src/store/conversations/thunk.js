import debounce from "lodash.debounce"
import { db } from "../../api/firebase"
import { handleChangeMessageValue } from "./actions"
import { GET_CONVERSATIONS } from "./types"

export const getConversationsFB = () => (dispatch) => {
  // @TODO сделать проверку на ошибку START/SUCCESS/ERROR статусы
  db.ref("conversations")
    .get()
    .then((snapshot) => {
      const conversations = []

      snapshot.forEach((snap) => {
        conversations.push(snap.val())
      })

      dispatch({ type: GET_CONVERSATIONS, payload: conversations })
    })
}

const cb = debounce(async ({ messageValue, roomId }) => {
  // @TODO сделать проверку на ошибку START/SUCCESS/ERROR статусы
  db.ref("conversations")
    .child(roomId)
    .update({ title: roomId, value: messageValue })
}, 500)

export const handleChangeMessageValueFB =
  (messageValue, roomId) => async (dispatch) => {
    await cb({ messageValue, roomId })

    dispatch(handleChangeMessageValue(messageValue, roomId))
  }
