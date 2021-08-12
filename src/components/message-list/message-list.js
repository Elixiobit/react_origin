import { Input, InputAdornment, makeStyles } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { useEffect, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import {
  handleChangeMessageValue,
  clearMessageValue,
} from "../../store/conversations"
import { sendMessage } from "../../store/messages"
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
  const { roomId } = useParams()

  const dispatch = useDispatch()

  const messages = useSelector((state) => {
    console.log("update")
    return state.messages.messages[roomId] || []
  })
  const value = useSelector((state) => {
    console.log("update")
    return (
      state.conversations.conversations.find(
        (conversation) => conversation.title === roomId,
      )?.value || ""
    )
  })

  const ref = useRef()

  const handleSendMessage = () => {
    if (value) {
      dispatch(sendMessage({ author: "User", message: value }, roomId))
      dispatch(clearMessageValue(roomId))
    }
  }

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      handleSendMessage()
    }
  }

  const handleScrollBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight)
    }
  }, [messages])

  useEffect(() => {
    handleScrollBottom()
  }, [handleScrollBottom])

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
        onChange={(e) =>
          dispatch(handleChangeMessageValue(e.target.value, roomId))
        }
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
