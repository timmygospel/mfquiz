import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/reducers/categoryReducer";
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../redux/reducers/questionReducer";

const QuestionManager = () => {
  const dispatch = useDispatch();
  const { items: questions, loading: questionLoading } = useSelector((state) => state.questions);
  const { items: categories, loading: categoryLoading } = useSelector((state) => state.categories);

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([{ text: "", correct: false }]);
  const [category, setCategory] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);

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
      console.log(newQuestion)
      dispatch(createQuestion(newQuestion));
    }
    setQuestionText("");
    setOptions([{ text: "", correct: false }]);
    setCategory("");
    setEditingQuestion(null);
  };

  const handleEdit = (question) => {
    setQuestionText(question.question);
    setOptions(question.options);
    setCategory(question.category?._id || "");
    setEditingQuestion(question);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
  };

  return (
    <div>
      <h2>Manage Questions</h2>
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
              onChange={(e) => handleOptionChange(index, "text", e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={option.correct}
                onChange={(e) => handleOptionChange(index, "correct", e.target.checked)}
              />
              Correct
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>Add Option</button>

        <h4>Category:</h4>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <button type="button" onClick={handleSave}>
          {editingQuestion ? "Update" : "Create"}
        </button>
      </form>

      <h3>Questions:</h3>
      {questionLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question._id}>
              {question.question} - Category: {question.category?.name || "None"}
              <button onClick={() => handleEdit(question)}>Edit</button>
              <button onClick={() => handleDelete(question._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionManager;
