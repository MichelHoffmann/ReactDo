import trash from "./assets/trash.svg";

import "./Task.css";
import "./global.css";
import { useState } from "react";

interface TaskProps {
  id: string;
  content: string;
  handleDeleteTask: (id: string, checked: boolean) => void;
  completedTasksIncrement: (check: boolean) => void;
}

export function Task({
  content,
  id,
  handleDeleteTask,
  completedTasksIncrement,
}: TaskProps) {
  const [checked, setChecked] = useState(false);

  function handleCompletedTask() {
    setChecked(!checked);
    completedTasksIncrement(checked);
  }

  function deleteTask() {
    handleDeleteTask(id, checked);
  }

  return (
    <div className="task">
      <input
        type="checkbox"
        name=""
        id={content}
        checked={checked}
        onChange={handleCompletedTask}
      />
      <p id={content} onClick={handleCompletedTask}>
        {content}
      </p>
      <img src={trash} alt="" onClick={deleteTask} />
    </div>
  );
}
