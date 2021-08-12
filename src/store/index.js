import { createStore, combineReducers } from "redux"
import { conversationsReducer } from "./conversations"
import { messagesReducer } from "./messages"
import { profileReducer } from "./profile"

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
  }),
)
