import React, { useState, useEffect } from "react";
import styles from "./AddNewTask.module.css";

function AddNewTask(props) {
  const [newTaskInput, setNewTaskInput] = useState("");
  const [enteredTaskInputIsValid, setEnteredTaskInputIsValid] = useState(false);
  const [enteredTaskInputTouched, setEnteredTaskInputTouched] = useState(false);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        buttonClickHandler();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  const taskInputHandler = (event) => {
    setNewTaskInput(event.target.value);
  };

  const buttonClickHandler = () => {
    setEnteredTaskInputTouched(true);

    if (newTaskInput.trim() === "") {
      setEnteredTaskInputIsValid(false);
      return;
    }

    setEnteredTaskInputIsValid(true);

    props.onAddNewTask(newTaskInput);

    setNewTaskInput("");
  };

  const taskInputIsInvalid =
    !enteredTaskInputIsValid && enteredTaskInputTouched;

  return (
    <div className={styles["addnewtask-general"]}>
      <input
        placeholder="Add New Task"
        onChange={taskInputHandler}
        value={newTaskInput}
        maxLength={38}
      />
      {taskInputIsInvalid && (
        <p className={styles["error-text"]}>Please type in the task first</p>
      )}
      <button onClick={buttonClickHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles["addnewtask-icon"]}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default AddNewTask;
