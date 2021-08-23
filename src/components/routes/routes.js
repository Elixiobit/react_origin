import React from "react"
import { Route, Redirect } from "react-router-dom"

export function PublicRoute({ authenticated, ...rest }) {
  return !authenticated ? <Route {...rest} /> : <Redirect to="/chat" />
}

export function PrivateRoute({ authenticated, ...rest }) {
  return authenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  )
}
