import classNames from "classnames"
import styles from "./message.module.css"

export function Message({ message }) {
  const { author, value } = message

  return (
    <div
      className={classNames(styles.message, {
        [styles.currentMessage]: author === "User",
      })}
    >
      <h3>{value}</h3>
      <p>{author}</p>
      <p>12.03</p>
    </div>
  )
}
