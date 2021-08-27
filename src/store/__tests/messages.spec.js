import { removeConversationById } from "../conversations"
import { messagesReducer, sendMessage, editMessage } from "../messages"
import { GET_MESSAGES } from "../messages/types"

describe("message reducer", () => {
  it("send message", () => {
    const state = messagesReducer(
      { messages: {} },
      sendMessage({ author: "User", message: "test" }, "room1"),
    )

    expect(state.messages.room1.length).toBe(1)
    expect(state.messages.room1[0]).toHaveProperty("author", "User")
    expect(state.messages.room1[0]).toHaveProperty("message", "test")
  })

  it("remove conversation messages", () => {
    const state = messagesReducer(
      { messages: { room1: [], room2: [] } },
      removeConversationById("room1"),
    )

    expect(Object.keys(state.messages)).toEqual(["room2"])
  })

  it("get messages", () => {
    const state = messagesReducer(
      { messages: {} },
      { type: GET_MESSAGES, payload: { room1: [1, 2, 3] } },
    )

    expect(Object.keys(state.messages)).toEqual(["room1"])
    expect(Object.values(state.messages)).toEqual([[1, 2, 3]])
  })

  it("edit message", () => {
    const state = messagesReducer(
      { messages: { room1: [{ id: 1, message: "test", author: "Bot" }] } },
      editMessage("new message", "room1", 1),
    )

    expect(state.messages.room1[0].message).toBe("new message")
  })
})
