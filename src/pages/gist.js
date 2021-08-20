import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGists, searchGistsByUserName } from "../store/gists"

// const API_URL_PUBLIC = (page) =>
//   `https://api.github.com/gists/public?page=${page}`

// const useGists = () => {
//   const [gists, setGists] = useState([])
//   const [pending, setPending] = useState(false)
//   const [error, setError] = useState(null)

//   const getGists = async (page = 1) => {
//     try {
//       setPending(true)

//       const response = await fetch(API_URL_PUBLIC(page))

//       const result = await response.json()

//       setGists(result)
//     } catch (e) {
//       setError(e)
//     } finally {
//       setPending(false)
//     }
//   }

//   useEffect(() => {
//     getGists()
//   }, [])

//   return { gists, pending, error, getGists }
// }

export function Gist() {
  // const { gists, pending, error, getGists } = useGists()
  const { gistsPending, gists, gistsError } = useSelector(
    (state) => state.gists,
  )

  const [search, setSearch] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    if (!gists.length) {
      dispatch(getGists())
    }
  }, [dispatch, gists])

  useEffect(() => {
    if (search) {
      dispatch(searchGistsByUserName(search))
    }
  }, [search, dispatch])

  if (gistsError) {
    return <h1>oooppss...</h1>
  }

  return (
    <div>
      {/* <button onClick={getGists}>get</button> */}
      {Array.from({ length: 10 }).map((_, index) => (
        <button key={index} onClick={() => dispatch(getGists(index + 1))}>
          button {index}
        </button>
      ))}
      <hr />
      <h1>Search</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <hr />

      {gistsPending ? (
        <h1>pending...</h1>
      ) : (
        <ul>
          {gists.map((gist, index) => (
            <li key={index}>{gist.description}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
