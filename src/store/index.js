import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { getGistsApi, searchGistsByUserNameApi } from "../api/gists"
import { conversationsReducer } from "./conversations"
import { gistsReducer } from "./gists"
import { messagesReducer } from "./messages"
import { logger, botSendMessage, timeoutScheduler, report } from "./middlewares"
import { profileReducer } from "./profile"

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["conversations", "messages"],
  whitelist: ["profile"],
}

const persistreducer = persistReducer(
  persistConfig,
  combineReducers({
    profile: profileReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
    gists: gistsReducer,
  }),
)

export const store = createStore(
  persistreducer,
  compose(
    applyMiddleware(
      report,
      thunk.withExtraArgument({ getGistsApi, searchGistsByUserNameApi }),
      logger,
      botSendMessage,
      timeoutScheduler,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args,
  ),
)

export const persistore = persistStore(store)
