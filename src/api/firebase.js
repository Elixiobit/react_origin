import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyA_Ok9LUi2WnDg4NBqpk6AFcjpJcSvXE_s",
  authDomain: "test-chat-62235.firebaseapp.com",
  databaseURL: "https://test-chat-62235-default-rtdb.firebaseio.com",
  projectId: "test-chat-62235",
  storageBucket: "test-chat-62235.appspot.com",
  messagingSenderId: "120550614384",
  appId: "1:120550614384:web:25a0978d8d4924913a1bb5",
  measurementId: "G-QT6SYFX17J",
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.database()
