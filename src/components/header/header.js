import { useContext } from "react"
import { ThemeContext } from "../theme-context"
import styles from "./header.module.css"

export function Header() {
  const { theme, changeTheme } = useContext(ThemeContext)

  return (
    <div className={styles.header}>
      <h1 style={{ color: theme.theme.color }}>Header {theme.name}</h1>
      <button onClick={() => changeTheme("dark")}>set dark theme</button>
      <button onClick={() => changeTheme("light")}>set light theme</button>
    </div>
  )
}
