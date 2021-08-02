import { useState, useEffect } from "react"

export const App = () => {
  const [messages, setMessages] = useState([])

  const [value, setValue] = useState("")

  const handleSendMessage = () => {
    setMessages((state) => [...state, { value, athor: "User" }])
    setValue("")
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]

    if (lastMessage?.athor === "User") {
      setTimeout(() => {
        setMessages((state) => [
          ...state,
          { value: "Helloo from bot", athor: "Bot" },
        ])
      }, 500)
    }
  }, [messages])

  return (
    <div>
      <ul>
        {messages.map((message, id) => (
          <li key={id}>
            {message.value} = {message.athor}
          </li>
        ))}
      </ul>

      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSendMessage}>send</button>
    </div>
  )
}
