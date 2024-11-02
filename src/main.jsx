import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './redux/reducers/quizReducer'
import QuestionReducer from './redux/reducers/questionReducer'
import categoryReducer from './redux/reducers/categoryReducer.jsx'

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    questions: QuestionReducer,
    categories: categoryReducer
  }
})
console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
)