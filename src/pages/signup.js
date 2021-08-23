import { Link } from "react-router-dom"
import { firebaseApp } from "../api/firebase"
import { LoginForm, LoginTemplete } from "../components"

const onSubmit = (email, password) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
}

export function SignUp() {
  return (
    <LoginTemplete link={<Link to="login">Есть аккаунт? Войдите</Link>}>
      <LoginForm
        title="Регистрация"
        submitButton="зарегистрироваться"
        onSubmit={onSubmit}
      />
    </LoginTemplete>
  )
}
