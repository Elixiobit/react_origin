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

export const MessageList = ({ messages, value }) => {
  const s = useStyles()
  // заменить на провайдер (удаляем)
  const [m, setMessages] = useState([])
  const [value2, setValue] = useState("")

  console.log(m, value2)

  const ref = useRef()

  const handleSendMessage = () => {
    if (value) {
      setMessages((state) => [...state, { value, author: "User" }])
      // props.handleChengeValue((state) => [...state, { value, author: "User" }])
      setValue("")
    }
  }

  const handlePressInput = ({ code }) => {
    if (code === "Enter" && value) {
      setMessages((state) => [...state, { value, author: "User" }])
      // props.sendMessage((state) => [...state, { value, author: "User" }])
      setValue("")
    }
  }

  const handleScrollBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    // перенести в провайдер еффект
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
          <Message key={id} {...message} />
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
