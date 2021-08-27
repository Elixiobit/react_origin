import userEvent from "@testing-library/user-event"
import React from "react"

import { renderWithRedux } from "../../../utils/rener-with-redux"
import { Chat } from "./chat"

let state = null

beforeEach(() => {
  state = {
    messages: {
      messages: { room1: [{ author: "User", message: "Test" }] },
    },
  }
})

describe("Chat component", () => {
  it("should render room id", () => {
    const { getByTestId } = renderWithRedux(<Chat title="room1" />, {
      initialState: state,
    })

    // expect(container).toMatchSnapshot()
    expect(getByTestId("title")).toHaveTextContent("room1")
  })
  it("should render message", () => {
    const { getByTestId } = renderWithRedux(<Chat title="room1" />, {
      initialState: state,
    })

    expect(getByTestId("description")).toHaveTextContent("User: Test")
  })

  it("should render chat with selected props", () => {
    const { getByRole } = renderWithRedux(
      <Chat title="room1" selected={true} />,
      {
        initialState: state,
      },
    )

    expect(getByRole("button")).toHaveClass("Mui-selected")
    // expect(container.querySelector(".Mui-selected")).toBeDefined()
  })

  it("should call handleListItemClick", () => {
    const mockCallBack = jest.fn()
    const { getByRole } = renderWithRedux(
      <Chat title="room1" selected={true} handleListItemClick={mockCallBack} />,
      {
        initialState: state,
      },
    )

    userEvent.click(getByRole("button"))

    expect(mockCallBack.mock.calls.length).toBe(1)
  })

  // it("snapshot", () => {
  //   const { container } = renderWithRedux(
  //     <Chat title="room1" selected={true} />,
  //     {
  //       initialState: {
  //         messages: {
  //           messages: { room1: [{ author: "User", message: "Test" }] },
  //         },
  //       },
  //     },
  //   )

  //   expect(container).toMatchSnapshot()
  // })
})
