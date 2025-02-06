import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import {
  addQuizTitle,
  addQuestion,
  updateQuestionText,
  addOption,
  updateOptionText,
  removeOption,
  setCorrectOption,
  addExistingQuestion,
  selectQuestion,
} from "../redux/reducers/quizReducer";
import { fetchQuestions } from "../redux/reducers/questionReducer"; // Ensure you have this action
import quizService from "../services/quizApi";

const QuizCreatorPage = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.quiz.title);
  const questions = useSelector((state) => state.quiz.questions);
  const existingQuestions = useSelector((state) => state.questions.items);
  const [isSaveVisable, setIsSaveVisable] = useState(false);
  const selectedQuestionIndex = useSelector(
    (state) => state.quiz.selectedQuestionIndex
  );

  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // Handle adding a quiz title
  const handleAddQuizTitle = (e) => {
    dispatch(addQuizTitle(e.target.value));
  };
  // Handle adding a new question and selecting it
  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  // Handle updating the question text
  const handleQuestionChange = (value) => {
    console.log("adding queastion change", value);

    dispatch(updateQuestionText({ index: selectedQuestionIndex, text: value }));
  };

  // Add a new blank option to a question
  const handleAddOption = (index) => {
    dispatch(addOption({ questionIndex: selectedQuestionIndex }));
  };
  // Update option text
  const handleOptionChange = (oIndex, value) => {
    console.log("adding option change");
    dispatch(
      updateOptionText({
        questionIndex: selectedQuestionIndex,
        optionIndex: oIndex,
        text: value,
      })
    );
  };
  // Remove an option
  const handleRemoveOption = (oIndex) => {
    dispatch(
      removeOption({
        questionIndex: selectedQuestionIndex,
        optionIndex: oIndex,
      })
    );
  };
  // Set an option as the correct answer
  const handleCorrectOptionChange = (qIndex, oIndex) => {
    dispatch(setCorrectOption({ questionIndex: qIndex, optionIndex: oIndex }));
  };

  const handleSelectQuestion = (index) => {
    dispatch(selectQuestion(index));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectExistingQuestion = (question) => {
    dispatch(addExistingQuestion(question));
    setShowModal(false);
  };
  const handleAddExistingQuestion = () => {
    dispatch(getExistingQuestions);
  };

  // Save quiz
  const handleSaveQuiz = async () => {
    setSaving(true);
    const data = {
      title: title,
      questions: questions,
    };

    try {
      const response = await quizService.addQuiz(data);
      alert("Quiz saved successfully!");
      console.log("Saved quiz:", response.data);
    } catch (error) {
      alert("Error saving quiz: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="questions-grid">
      <aside className="sidebar ">
        <ul>
          {questions.map((q, index) => (
            <li
              key={index}
              className="question-card"
              onClick={() => handleSelectQuestion(index)}
            >
              {q.question || `Question ${index + 1}`}
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Quiz Creation Area */}
      <div className="content">
        <h1>Create Quiz</h1>

        {/* <button onClick={handleOpenModal}>choose from existing questions</button>  */}
        {/* Quiz title input */}
        <div className="first">
          <input
            className="create-quiz-title-input"
            type="text"
            value={title}
            onChange={handleAddQuizTitle}
            placeholder="Enter quiz title"
          />
        </div>
        <div className="addQuestion_container">
          <button className="add_question" onClick={handleAddQuestion}>
            Add First Question
          </button>
          {questions[selectedQuestionIndex] && (
            <div clasName="quiz-container">
              <div className="quiz-items">
                {/* Question text */}
                <input
                  type="text"
                  className="create-quiz-title-input"
                  value={questions[selectedQuestionIndex].question || ""}
                  onChange={(e) => handleQuestionChange(e.target.value)}
                  placeholder="Enter question text"
                />

                {/* Options list */}

                {questions[selectedQuestionIndex].options.map(
                  (option, oIndex) => (
                    <>
                      <div className="question-option" key={oIndex}>
                        <div class="check-circle">
                          <i class="fas fa-check-circle"></i>
                        </div>

                        <input
                          type="text"
                          className="option-input"
                          value={option.text || ""}
                          onChange={(e) =>
                            handleOptionChange(oIndex, e.target.value)
                          }
                          placeholder="Enter option text"
                        />

                        <div class="icons">
                          <span onClick={() => handleRemoveOption(oIndex)}>
                            <i className="fa-regular fa-trash-can"></i>
                          </span>
                        </div>
                      </div>
                    </>
                  )
                )}

                {/* Add new option button */}
                <button onClick={handleAddOption}>Add Option</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal for selecting existing questions */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Select Existing Questions"
      >
        <ul>
          {existingQuestions.map((question) => (
            <li key={question._id}>
              {question.question}
              <button onClick={() => handleSelectExistingQuestion(question)}>
                Add
              </button>
            </li>
          ))}
        </ul>
      </Modal>
      {/* Save quiz button */}
      <div className="footer">
        {questions.length > 0 && (
          <button onClick={handleSaveQuiz} disabled={saving}>
            {saving ? "Saving..." : "Save Quiz"}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCreatorPage;
