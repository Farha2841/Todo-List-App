import React, { useState, useEffect } from "react";
import "./Todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (editId) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text: input }: task
        )
      );

      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setInput(task.text);
    setEditId(task.id);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => 
        task.id === id ? {
              ...task,
              completed: !task.completed,
            }: task
      )
    );
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>Todo List</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
          />

          <button type="submit">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul className="todo-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={
                task.completed
                  ? "completed"
                  : ""
              }
            >
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleComplete(task.id)
                  }
                />

                <span>{task.text}</span>
              </div>

              <div className="buttons">
                <button
                  className="edit-btn"
                  onClick={() =>
                    editTask(task)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;