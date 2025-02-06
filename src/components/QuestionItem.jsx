import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTrash } from "react-icons/fa";

const QuestionItem = ({ questionData, onQuestionUpdate }) => {
  const { questionText, options } = questionData;

  const handleQuestionTextChange = (e) => {
    onQuestionUpdate({ ...questionData, questionText: e.target.value });
  };

  const handleOptionTextChange = (index, text) => {
    const updatedOptions = options.map((opt, i) =>
      i === index ? { ...opt, text } : opt
    );
    onQuestionUpdate({ ...questionData, options: updatedOptions });
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, { text: "", correct: false}];
    onQuestionUpdate({ ...questionData, options: updatedOptions });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    onQuestionUpdate({...questionData,options: updatedOptions});
  };

  const handleSetCorrect = (index) => {
    const updatedOptions = options.map((opt, i) => ({
        ...opt,
        correct: i === index,
      }));
      onQuestionUpdate({ ...questionData, options: updatedOptions });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter question text"
        value={questionText}
        onChange={handleQuestionTextChange}
      />
      <ul>
        {options.map((opt, index) => (
          <li key={index}>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt.text}
              onChange={(e) => handleOptionTextChange(index, e.target.value)}
            />
            <FaCheck
              className={opt.correct ? "correct" : ""}
              onClick={() => handleSetCorrect(index)}
            />
            <FaTrash onClick={() => handleRemoveOption(index)} />
          </li>
        ))}
      </ul>
      <button onClick={handleAddOption}>Add Option</button>
    </div>
  );
};

export default QuestionItem;
