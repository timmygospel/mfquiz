import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../redux/reducers/questionReducer";
import { fetchCategories } from "../redux/reducers/categoryReducer";

const QuestionModal = ({ isOpen, onClose, onAddQuestions }) => {
  const dispatch = useDispatch();
  const { items: questions, loading } = useSelector((state) => state.questions);
  const { items: categories } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Fetch questions when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchQuestions());
      if (!categories.length) {
        dispatch(fetchCategories());
      }
    }
  }, [isOpen, dispatch, categories.length]);

  // Reset selections when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedCategory("");
      setSelectedQuestions([]);
    }
  }, [isOpen]);

  // Filter questions by selected category
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    dispatch(fetchQuestions({ categoryId: e.target.value }));
  };

  // Add or remove questions from selection
  const handleQuestionToggle = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Submit selected questions and close modal
  const handleAddQuestions = () => {
    onAddQuestions(selectedQuestions);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h3>Select Questions</h3>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {loading ? (
            <p>Loading questions...</p>
          ) : (
            <ul>
              {questions.map((question) => (
                <li key={question._id}>
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question._id)}
                    onChange={() => handleQuestionToggle(question._id)}
                  />
                  {question.question}
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleAddQuestions}>Add Selected Questions</button>
        </div>
      </div>
    )
  );
};

export default QuestionModal;
