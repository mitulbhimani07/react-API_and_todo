import React, { useState } from "react";

function Card() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue(""); // Clear the input field
    }
  };

  // Function to toggle the completion status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Todo List</h1>
      {/* Input field for adding new todos */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={addTodo} style={{ padding: "10px" }}>
        Add Todo
      </button>

      {/* Display the list of todos */}
      <ul style={{ listStyle: "none", padding: "0", marginTop: "20px" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ccc",
              margin: "10px 0",
              borderRadius: "5px",
              backgroundColor: todo.completed ? "#e0f7fa" : "#fff",
            }}
          >
            {/* Todo text with strike-through if completed */}
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                flex: 1,
                textAlign: "left",
              }}
            >
              {todo.text}
            </span>

            {/* Toggle completion button */}
            <button
              onClick={() => toggleTodo(todo.id)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                backgroundColor: todo.completed ? "#ffcc80" : "#81c784",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>

            {/* Delete button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#ff6666",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;