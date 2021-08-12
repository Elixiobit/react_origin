import { SEND_MESSAGE } from "./types"

const initialState = {
  messages: {
    room1: [{ id: new Date(), author: "Bot", message: "Hello fron store 1" }],
    room2: [{ id: new Date(), author: "Bot", message: "Hello fron store 2" }],
  },
}

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...state.messages[action.payload.roomId],
            { ...action.payload.message, id: new Date() },
          ],
        },
      }
    default:
      return state
  }
}
