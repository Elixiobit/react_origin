import { Link } from "react-router-dom"
import { firebaseApp } from "../api/firebase"
import { LoginForm, LoginTemplete } from "../components"

const onSubmit = (email, password) => {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password)
}

export function Login() {
  return (
    <LoginTemplete
      link={<Link to="signup">Нет аккаунта? Зарегистрируйтесь</Link>}
    >
      <LoginForm title="Авторизация" submitButton="Вход" onSubmit={onSubmit} />
    </LoginTemplete>
  )
}
