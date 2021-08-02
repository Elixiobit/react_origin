import { Input, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { useState, useEffect } from "react"

export const MessageList = () => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")

  const handleSendMessage = () => {
    setMessages((state) => [...state, { value, athor: "User" }])
    setValue("")
  }

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      setMessages((state) => [...state, { value, athor: "User" }])
      setValue("")
    }
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

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handlePressInput}
        fullWidth={true}
        placeholder="Введите сообщение..."
        endAdornment={
          <InputAdornment position="end">
            <Send onClick={handleSendMessage} />
          </InputAdornment>
        }
      />
    </div>
  )
}
