import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quizService from "../services/quizApi";
import Pagination from "react-responsive-pagination";

const QuizAdminPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of quizzes per page

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
      setDeletingId(id);
      await quizService.deleteQuiz(id);
      alert("Quiz deleted successfully!");
      fetchQuizzes(); // Refresh the list
    } catch (err) {
      alert("Failed to delete quiz.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Calculate current quizzes to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuizzes = quizzes.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-banner">{error}</div>;

  return (
    <div className="quiz-container-rightside">
    <div> quizes information</div>
    <div className="quiz-list">
      <h2>Existing Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <>
          <ul>
            {currentQuizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-item">
                <div className="quiz-row">
                  <div className="quiz-info">
                    <h3>{quiz.title}</h3>
                    <p>Number of Questions: {quiz.questions.length}</p>
                  </div>
                  <div className="quiz-actions">
                    <Link
                      to={`/quizzes/${quiz._id}/edit`}
                      className="edit-link"
                    >
                      Edit 
                    </Link>
                    <button
                      aria-label={`Delete quiz ${quiz.title}`}
                      onClick={() => handleDelete(quiz._id)}
                      disabled={deletingId === quiz._id}
                      className="delete-button"
                    >
                      {deletingId === quiz._id ? "Deleting..." : "Delete Quiz"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            current={currentPage}
            total={Math.ceil(quizzes.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
    </div>
  );
};

export default QuizAdminPage;
