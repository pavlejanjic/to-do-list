import React, { useEffect, useState } from "react";
import AddNewTask from "./AddNewTask";
import "./App.css";
import Container from "./Container";
import TaskList from "./TaskList";

function App() {
  const [currentData, setCurrentData] = useState([]);

  // Local storage

  useEffect(() => {
    if (
      localStorage.getItem("savedTasks") &&
      localStorage.getItem("savedTasks").length
    ) {
      setCurrentData(JSON.parse(localStorage.getItem("savedTasks")));
    }
  }, []);

  useEffect(() => {
    if (currentData.length) {
      localStorage.setItem("savedTasks", JSON.stringify(currentData));
    }
  }, [currentData]);

  const onAddNewTask = (newTask) => {
    setCurrentData((prevState) => {
      return [
        { task: newTask, id: Math.random().toString(), done: false },
        ...prevState,
      ];
    });
  };

  const filteredItemsHandler = (filteredItems) => {
    setCurrentData(filteredItems);
    if (!filteredItems.length) {
      localStorage.setItem("savedTasks", JSON.stringify(filteredItems));
    }
  };

  const updateTaskList = (oldTask) => {
    const newCurrentData = currentData.map((item) => {
      if (item.task === oldTask.task) {
        return { ...item, done: true };
      }
      return item;
    });
    setCurrentData(newCurrentData);
  };

  return (
    <div>
      <h1>To-do List</h1>
      <Container>
        <TaskList
          updateTaskList={updateTaskList}
          onFilteredItemsSomething={filteredItemsHandler}
          tasksFromApp={currentData}
        />
      </Container>
      <AddNewTask onAddNewTask={onAddNewTask} />
    </div>
  );
}

export default App;
