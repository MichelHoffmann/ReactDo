import "./App.css";
import "./global.css";

import rocketLogo from "./assets/rocket.svg";
import plus from "./assets/plus.svg";
import empty from "./assets/empty.svg";

import { FormEvent, useState } from "react";
import { Task } from "./Task";

import { v4 as uuidv4 } from "uuid";

interface TaskInterface {
  id: string;
  content: string;
}

export function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [inputText, setInputText] = useState<string>("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    if (!inputText) {
      alert("Digite sua proxima tarefa!");
      return;
    }
    setTasks([...tasks, { id: uuidv4(), content: inputText }]);
    setInputText("");
    document.querySelector("input")?.focus();
  }

  function handleDeleteTask(idToDelete: string, isCompleted: boolean) {
    const tasksWithoutDeletedOne = tasks.filter(
      (task) => task.id !== idToDelete
    );
    setTasks([...tasksWithoutDeletedOne]);
    if (isCompleted) {setCompletedTasks(completedTasks - 1)}
  }

  function completedTasksIncrement(checked: boolean) {
    if (!checked) {
      setCompletedTasks(completedTasks >= 0 ? completedTasks + 1 : completedTasks);
    }
    if (checked) {
      setCompletedTasks(completedTasks > 0 ? completedTasks - 1 : completedTasks);
    }
  }

  return (
    <div className="container">
      <header>
        <div className="header-wrapper">
          <img src={rocketLogo} alt="" />
          <p>
            React
            <span>Do</span>
          </p>
        </div>
      </header>

      <div className="main">
        <form>
          <input
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            value={inputText}
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit" onClick={handleCreateNewTask}>
            Criar <img src={plus} alt="" />
          </button>
        </form>
        <section>
          <header>
            <p>
              Tarefas criadas <span>{tasks.length}</span>
            </p>
            <p>
              Concluidas <span>{completedTasks}</span>
            </p>
          </header>
          <div className="tasks">
            {tasks.length === 0 ? (
              <>
                <img src={empty} alt="" />
                <p>
                  Você ainda não tem tarefas cadastradas <br /> Crie tarefas e
                  organize seus itens a fazer
                </p>
              </>
            ) : (
              tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    handleDeleteTask={handleDeleteTask}
                    completedTasksIncrement={completedTasksIncrement}
                  />
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
