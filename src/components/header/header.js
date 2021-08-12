import { Grid, Switch } from "@material-ui/core"
import { useContext } from "react"
import { ThemeContext } from "../theme-context"
import styles from "./header.module.css"
import { Menu } from "./menu"

export function Header() {
  const { theme, changeTheme } = useContext(ThemeContext)

  const isLightTheme = theme.name === "light"

  return (
    <div className={styles.header}>
      <Menu />

      <Grid style={{ color: theme.theme.color }} item={true}>
        dark
      </Grid>
      <Grid item={true}>
        <Switch
          name="checkedC"
          checked={isLightTheme}
          onChange={() => changeTheme(isLightTheme ? "dark" : "light")}
        />
      </Grid>
      <Grid style={{ color: theme.theme.color }} item={true}>
        light
      </Grid>
    </div>
  )
}
