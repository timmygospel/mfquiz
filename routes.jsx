import {  Navigate, useRoutes} from "react-router-dom"
import DashboardLayout from "./layouts/dashboard/DashboardLayout"
import LoginPage from "./layouts/login/loginScreen"
import QuestionPage from "./pages/QuestionPage"
import AdminPage from "./pages/AdminPage"
import QuizPage from "./pages/QuizPage"


export default function Router() {
    const routes = useRoutes([
        {
            path: "/",
            element: <LoginPage />
        },{
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
                { path: 'quiz', element: <QuizPage /> },
                {path: 'question', element: <QuestionPage />},
                { path: 'user', element: <AdminPage />}
              
            ]
        }
    ])
    return routes
}