import { getGists } from "../gists"
import { GET_GISTS_START, GET_GISTS_SUCCESS } from "../gists/types"

describe("test gists thunks", () => {
  it("get gists", async () => {
    const PAGE = 2

    const dispatch = jest.fn()
    const getGistsApi = jest.fn().mockResolvedValue({ data: "ok" })

    const thunk = getGists(PAGE)

    await thunk(dispatch, null, { getGistsApi })

    expect(dispatch).toBeCalledTimes(2)
    expect(getGistsApi).toBeCalledTimes(1)
    expect(getGistsApi).toBeCalledWith(PAGE)

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: GET_GISTS_START })
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: GET_GISTS_SUCCESS,
      payload: "ok",
    })
  })
})
