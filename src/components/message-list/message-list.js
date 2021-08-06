import { Input, InputAdornment, makeStyles } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { useState, useEffect, useRef, useCallback } from "react"
import { Message } from "./message"
import styles from "./message-list.module.css"

const useStyles = makeStyles(() => {
  return {
    input: {
      color: "#9a9fa1",
      padding: "10px 15px",
      fontSize: " 15px",
    },
  }
})

export const MessageList = () => {
  const s = useStyles()
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")

  const ref = useRef()

  const handleSendMessage = () => {
    if (value) {
      setMessages((state) => [...state, { value, author: "User" }])
      setValue("")
    }
  }

  const handlePressInput = ({ code }) => {
    if (code === "Enter" && value) {
      setMessages((state) => [...state, { value, author: "User" }])
      setValue("")
    }
  }

  const handleScrollBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]

    handleScrollBottom()

    if (lastMessage?.author === "User") {
      setTimeout(() => {
        setMessages((state) => [
          ...state,
          { value: "Helloo from bot", author: "Bot" },
        ])
      }, 500)
    }
  }, [messages, handleScrollBottom])

  return (
    <>
      <div ref={ref}>
        {messages.map((message, id) => (
          <Message key={id} message={message} />
        ))}
      </div>

      <Input
        className={s.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handlePressInput}
        fullWidth={true}
        placeholder="Введите сообщение..."
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <Send onClick={handleSendMessage} className={styles.icon} />
            )}
          </InputAdornment>
        }
      />
    </>
  )
}
