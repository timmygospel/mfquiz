import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchQuizById,
  addQuizTitle,
  addQuestion,
  updateQuestionText,
  addOption,
  removeOption,
  updateOptionText,
  setCorrectOption,
  deleteQuestion,
  updateQuiz,
  loadQuizForEdit,
} from "../redux/reducers/quizReducer";
import { useParams } from "react-router-dom";
import quizService from "../services/quizApi";

const QuizEditorPage = () => {
  const { id: quizId } = useParams(); // Use quizId from URL
  const dispatch = useDispatch();
  const { title, questions, loading } = useSelector((state) => state.quiz);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await quizService.getQuizById(quizId);
        console.log('what us quiz', quiz);
        dispatch(
          loadQuizForEdit({
            title: quiz.title,
            questions: quiz.questions,
            quizId: quiz._id,
          })
        );
      } catch (err) {
        setError("Failed to load the quiz.");
      }
    };

    fetchQuiz();
  }, [dispatch, quizId]);

  const handleTitleChange = (e) => {
    dispatch(addQuizTitle(e.target.value));
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleQuestionTextChange = (index, value) => {
    dispatch(updateQuestionText({ index, text: value }));
  };

  const handleAddOption = (questionIndex) => {
    dispatch(addOption({ questionIndex }));
  };

  const handleOptionTextChange = (questionIndex, optionIndex, value) => {
    dispatch(updateOptionText({ questionIndex, optionIndex, text: value }));
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    dispatch(removeOption({ questionIndex, optionIndex }));
  };

  const handleSetCorrectOption = (questionIndex, optionIndex) => {
    console.log('Emtering handleSetCorrectOption');
    dispatch(setCorrectOption({ questionIndex, optionIndex }));
  };

  const handleDeleteQuestion = (index) => {
    dispatch(deleteQuestion({ index }));
  };

  // const handleSaveQuiz = async () => {
  //   try {
  //     await dispatch(
  //       updateQuiz({
  //         quizId,
  //         updatedData: { title, questions },
  //       })
  //     ).unwrap();
  //     alert("Quiz updated successfully!");
  //     history.push("/quizzes");
  //   } catch (error) {
  //     alert("Failed to update quiz: " + error.message);
  //   }
  // };

  const handleSaveQuiz = async () => {
    // Validation: Check for missing title or incomplete questions
    console.log(' handleSaveQuiz validation', questions)
    if (!title || questions.some((q) => !q.question || q.options.length < 2)) {
      alert(
        "Please provide a title, ensure all questions have text, and at least two options."
      );
      return;
    }
  
    // Prepare data for dispatch
    const updatedData = {
      title,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options.map((o) => ({
          text: o.text,
          correct: o.correct,
        })),
      })),
    };
  
    try {
      console.log("Updating quiz with data:", updatedData); // Debugging log
      await dispatch(
        updateQuiz({
          quizId,
          updatedData,
        })
      )
      alert("Quiz updated successfully!");
      navigate("/user"); // Redirect to quizzes page
    } catch (error) {
      console.error("Error updating quiz:", error); // Debugging log
      alert("Failed to update quiz: " + error.message);
    }
  };
  
 

  return (
    <div className="quiz-editor">
      <h1>Edit Quiz</h1>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Quiz Title:</label>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>

      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question-block">
          <input
            type="text"
            placeholder="Question Text"
            value={question.question } // Safeguard against undefined
            onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
          />
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="option-block">
              <input
                type="text"
                placeholder="Option Text"
                value={option.text}
                onChange={(e) =>
                  handleOptionTextChange(qIndex, oIndex, e.target.value)
                }
              />
              <button
                onClick={() => handleSetCorrectOption(qIndex, oIndex)}
                style={{ color: option.correct ? "green" : "yellow" }}
              >
                ✓
              </button>
              <button onClick={() => handleRemoveOption(qIndex, oIndex)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={() => handleAddOption(qIndex)}>Add Option</button>
          <button onClick={() => handleDeleteQuestion(qIndex)}>
            Delete Question
          </button>
        </div>
      ))}

      <button onClick={handleSaveQuiz}>
       update quiz
      </button>
    </div>
  );
};

export default QuizEditorPage;
