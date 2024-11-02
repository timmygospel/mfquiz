// src/components/QuizList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quizService from "../services/quizApi";

const QuizAdminPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizService.getAllQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError("Failed to fetch quizzes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await quizService.deleteQuiz(id);
      alert("Quiz deleted successfully!");
      fetchQuizzes(); // Refresh the list
    } catch (err) {
      alert("Failed to delete quiz.");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-list">
      <h2>Existing Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="quiz-item">
              <h3>{quiz.title}</h3>
              <p>Number of Questions: {quiz.questions.length}</p>
              <div className="quiz-actions">
                <Link to={`/quizzes/${quiz._id}/edit`} className="edit-link">
                  Edit Quiz 1
                </Link>
                <button
                  onClick={() => handleDelete(quiz._id)}
                  disabled={deleting}
                  className="delete-button"
                >
                  {deleting ? "Deleting..." : "Delete Quiz"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizAdminPage;
