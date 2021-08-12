import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import { memo } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./chat.module.css"

const useStyles = makeStyles(() => {
  return {
    item: {
      "&.Mui-selected": {
        backgroundColor: "#2b5278",
      },
      "&.Mui-selected:hover": {
        backgroundColor: "#2b5278",
      },
    },
  }
})

function ChatView({ title, selected, handleListItemClick }) {
  const s = useStyles()

  const messages = useSelector((state) => {
    console.log("update")
    return state.messages.messages[title]
  })

  const lastMessage = messages[messages.length - 1]

  return (
    <Link to={`/chat/${title}`}>
      <ListItem
        className={s.item}
        button={true}
        selected={selected}
        onClick={handleListItemClick}
      >
        <ListItemIcon>
          <AccountCircle fontSize="large" className={styles.icon} />
        </ListItemIcon>
        <div className={styles.description}>
          <ListItemText className={styles.text} primary={title} />
          {lastMessage && (
            <ListItemText
              className={styles.text}
              primary={`${lastMessage.author}: ${lastMessage.message}`}
            />
          )}
          <ListItemText className={styles.text} primary="12.30" />
        </div>
      </ListItem>
    </Link>
  )
}

export const Chat = memo(ChatView)
