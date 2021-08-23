import { makeStyles } from "@material-ui/core"

export function LoginTemplete({ children, link }) {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      {children}
      <div className={styles.link}>{link}</div>
    </div>
  )
}

const useStyles = makeStyles(() => {
  return {
    root: {
      width: 500,
      margin: "0 auto",
      marginTop: "20%",
    },
    link: {
      display: "flex",
      justifyContent: "center",
      marginTop: 30,
      color: "#000",
    },
  }
})
