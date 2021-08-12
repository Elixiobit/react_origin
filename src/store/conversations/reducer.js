import { HANDLE_CHANGE_MESSAGE_VALUE, CLEAR_MESSAGE_VALUE } from "./types"

const initialState = {
  conversations: [
    { title: "room1", value: "test value 1" },
    { title: "room2", value: "test value 2" },
  ],
}

const updateConversations = (state, roomId, value) =>
  state.conversations.map((conversation) => {
    return conversation.title === roomId
      ? { ...conversation, value }
      : conversation
  })

export const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CHANGE_MESSAGE_VALUE:
      return {
        ...state,
        conversations: updateConversations(
          state,
          action.payload.roomId,
          action.payload.value,
        ),
      }
    case CLEAR_MESSAGE_VALUE:
      return {
        ...state,
        conversations: updateConversations(state, action.payload, ""),
      }
    default:
      return state
  }
}
