import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import LoginPage from "./layouts/dashboard/login/loginScreen";
import AdminPage from "./pages/QuizAdminPage";
import QuizPage from "./pages/QuizCreatorPage";
import EditQuiz from "./pages/EditQuiz";
import QuestionManager from "./components/QuestionManager";
import CategoryManager from "./components/CategoryManager";
import QuestionsPage from "./pages/QuestionsPage";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "quiz", element: <QuizPage /> },
        { path: "quizzes/:id/edit", element: <EditQuiz /> }, // Edit Quiz Pag
        { path: "user", element: <AdminPage /> },
        { path: "questions", element: <QuestionManager /> },
        { path: "categories", element:<CategoryManager /> },
        { path: "questionlist", element:<QuestionsPage />}
      ],
    },
  ]);
  return routes;
}
