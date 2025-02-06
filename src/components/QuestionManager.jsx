import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Pagination from "react-responsive-pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/reducers/categoryReducer";
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../redux/reducers/questionReducer";

Modal.setAppElement("#root"); // Required for accessibility

const QuestionManager = () => {
  const dispatch = useDispatch();
  const { items: questions, loading: questionLoading } = useSelector(
    (state) => state.questions
  );
  const { items: categories, loading: categoryLoading } = useSelector(
    (state) => state.categories
  );

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([{ text: "", correct: false }]);
  const [category, setCategory] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddOption = () => {
    setOptions([...options, { text: "", correct: false }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    const newQuestion = { question: questionText, options, category };
    if (editingQuestion) {
      dispatch(updateQuestion({ id: editingQuestion._id, data: newQuestion }));
    } else {
      dispatch(createQuestion(newQuestion));
    }

    // Reset form and close modal
    setQuestionText("");
    setOptions([{ text: "", correct: false }]);
    setCategory("");
    setEditingQuestion(null);
    setIsModalOpen(false);
  };

  const handleEdit = (question) => {
    setQuestionText(question.question);
    setOptions(question.options);
    setCategory(question.category?._id || "");
    setEditingQuestion(question);
    setIsModalOpen(true); // Open modal for editing
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="question-list-container">
      <h2>Manage Questions</h2>
      <button onClick={() => setIsModalOpen(true)}>Create Question</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Question"
        style={{
          content: {
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
          },
        }}
      >
        <h2>{editingQuestion ? "Edit Question" : "Create Question"}</h2>
        <form>
          <input
            type="text"
            placeholder="Enter question text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <h4>Options:</h4>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Option text"
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
              />
              <label>
                <input
                  type="checkbox"
                  checked={option.correct}
                  onChange={(e) =>
                    handleOptionChange(index, "correct", e.target.checked)
                  }
                />
                Correct
              </label>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>

          <h4>Category:</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleSave}>
            {editingQuestion ? "Update" : "Create"}
          </button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
      <div className="question-list-container">
        <h3>Questions:</h3>
        {questionLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {paginatedQuestions.map((question) => (
              <li key={question._id} className="quiz-item">
                <div className="quiz-row">
                  <div className="quiz-info">
                    <h3>{question.question}</h3>
                  </div>
                  <div className="quiz-actions">
                   
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(question)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(question._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuestionManager;
