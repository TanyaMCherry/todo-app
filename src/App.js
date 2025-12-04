// App.js
import { useState, useEffect } from "react";
import "./App.css"; // make sure to update CSS for new buttons/styles

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save tasks to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTask = (id) => {
    const newText = prompt("Edit task:");
    if (newText) {
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, text: newText } : t))
      );
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTodos([]);
    }
  };

  return (
    <div className="container">
      <h1>My daily planner</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
        <button onClick={clearAll} className="clear-btn">Clear All</button>
      </div>

      <ul className="task-list">
        {todos.map((t) => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            <span
              onClick={() => toggleComplete(t.id)}
              style={{ cursor: "pointer" }}
            >
              {t.text}
            </span>
            <div className="buttons">
              <button onClick={() => editTask(t.id)}>Edit</button>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
