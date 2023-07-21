import styles from "./TaskList.module.css";
import Task from "./Task";

function TaskList(props) {
  const handleClick = (deletedItem) => {
    const filteredTasks = props.tasksFromApp.filter(
      (item) => item.task !== deletedItem.task
    );

    props.onFilteredItemsSomething(filteredTasks);
  };

  const sortedCurrentData = props.tasksFromApp.sort((a, b) => {
    if (a.done === false && b.done === true) {
      return -1;
    } else if (a.done === true && b.done === false) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <ul className={styles["tasklist-general"]}>
      {sortedCurrentData.map((item, id) => (
        <li key={id} onDoubleClick={() => handleClick(item)}>
          <Task
            deleteTask={handleClick}
            updateTaskList={props.updateTaskList}
            id={id}
            dummyTask={item}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
