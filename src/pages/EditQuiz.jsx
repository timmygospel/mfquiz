// src/components/EditQuiz.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  addQuizTitle,
  addQuestion,
  loadQuizForEdit,
  updateQuestionText,
  addOption,
  updateOptionText,
  removeOption,
  setCorrectOption,
  selectQuestion,
} from "../redux/reducers/quizReducer";
import quizService from "../services/quizApi";

const EditQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, questions, selectedQuestionIndex, editingQuizId } =
    useSelector((state) => state.quiz);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        console.log(" entering fetchQuiz = ", id);
        const quiz = await quizService.getQuizById(id);
        dispatch(
          loadQuizForEdit({
            title: quiz.quiz,
            questions: quiz.questions,
            quizId: quiz._id,
          })
        );
      } catch (err) {
        setError("Failed to load the quiz.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [dispatch, id]);

  const handleTitleChange = (e) => {
    dispatch(addQuizTitle(e.target.value));
  };

  // Add a new question to the quiz
  const handleAddQuestion = () => {
    dispatch(addQuestion()); // Dispatch the addQuestion action
  };

  const handleQuestionChange = (index, value) => {
    dispatch(updateQuestionText({ index, text: value }));
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    dispatch(
      updateOptionText({
        questionIndex: qIndex,
        optionIndex: oIndex,
        text: value,
      })
    );
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    dispatch(setCorrectOption({ questionIndex: qIndex, optionIndex: oIndex }));
  };

  const handleAddOption = (index) => {
    dispatch(addOption({ questionIndex: index }));
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    dispatch(removeOption({ questionIndex: qIndex, optionIndex: oIndex }));
  };

  const handleSelectQuestion = (index) => {
    dispatch(selectQuestion(index));
  };

  const handleSaveQuiz = async () => {
    if (!title.trim()) {
      alert("Quiz title cannot be empty!");
      return;
    }

    if (questions.length === 0) {
      alert("Please add at least one question!");
      return;
    }

    for (const question of questions) {
      if (!question.question.trim()) {
        alert("All questions must have text!");
        return;
      }

      const hasCorrectOption = question.options.some(
        (option) => option.correct
      );
      if (!hasCorrectOption) {
        alert("Each question must have a correct option!");
        return;
      }

      const emptyOption = question.options.some(
        (option) => !option.text.trim()
      );
      if (emptyOption) {
        alert("All options must have text!");
        return;
      }
    }

    setSaving(true);

    const updatedQuiz = { title, questions };
    console.log(
      "Quiz data being sent to the API:",
      JSON.stringify(updatedQuiz, null, 2)
    ); // Pretty print the data

    try {
      await quizService.updateQuiz(editingQuizId, updatedQuiz);
      alert("Quiz updated successfully!");
      navigate("/quizzes"); // Redirect to quiz list after saving
    } catch (error) {
      console.error(
        "Failed to save quiz:",
        error.response ? error.response.data : error
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-quiz">
      <h2>Edit Quiz</h2>
      <div className="quiz-creator">
        <aside className="question-list">
          <h3>Questions</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index} onClick={() => handleSelectQuestion(index)}>
                {q.question || `Question ${index + 1}`}
              </li>
            ))}
          </ul>
        </aside>

        <div className="question-creator">
          <input
            type="text"
            placeholder="Enter quiz title"
            value={title}
            onChange={handleTitleChange}
            className="quiz-title-input"
          />
          {selectedQuestionIndex !== null &&
            questions[selectedQuestionIndex] && (
              <div className="question-block">
                <input
                  type="text"
                  placeholder="Enter question"
                  value={questions[selectedQuestionIndex].question}
                  onChange={(e) =>
                    handleQuestionChange(selectedQuestionIndex, e.target.value)
                  }
                />
                {questions[selectedQuestionIndex].options.map(
                  (option, oIndex) => (
                    <div key={oIndex} className="option-block">
                      <input
                        type="text"
                        placeholder="Enter option"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(
                            selectedQuestionIndex,
                            oIndex,
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="radio"
                        checked={option.correct}
                        onChange={() =>
                          handleCorrectOptionChange(
                            selectedQuestionIndex,
                            oIndex
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveOption(selectedQuestionIndex, oIndex)
                        }
                      >
                        Remove Option
                      </button>
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => handleAddOption(selectedQuestionIndex)}
                >
                  Add Option
                </button>
              </div>
            )}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
          <button type="button" onClick={handleSaveQuiz} disabled={saving}>
            {saving ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
