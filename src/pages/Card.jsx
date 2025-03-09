import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaCheck, FaTrash } from "react-icons/fa"; // Import icons

function Card() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status

  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, status: status },
      ]);
      setInputValue(""); // Clear the input field
      setStatus("Pending"); // Reset status to default
    }
  };

  // Function to change status of a todo
  const changeStatus = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-dark fw-bold">📌 Todo List</h1>

      {/* Input Section */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group shadow-sm">
            <input
              type="text"
              className="form-control border-dark"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new task..."
            />
            <select
              className="form-select border-dark"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="btn btn-dark" onClick={addTodo}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Display Todos */}
      <div className="row mt-4">
        {/* Pending Section */}
        <div className="col-md-4">
          <div className="card border-warning shadow-sm">
            <div className="card-header bg-warning text-white text-center fw-bold">
              ⏳ Pending Tasks
            </div>
            <div className="card-body">
              {todos.filter(todo => todo.status === "Pending").length === 0 ? (
                <p className="text-center text-muted">No pending tasks</p>
              ) : (
                todos
                  .filter(todo => todo.status === "Pending")
                  .map((todo) => (
                    <div key={todo.id} className="alert alert-light d-flex justify-content-between align-items-center">
                      <span>{todo.text}</span>
                      <div>
                        <button className="btn btn-sm btn-info me-2" onClick={() => changeStatus(todo.id, "In Progress")}>
                          <FaPlay /> Start
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* In Progress Section */}
        <div className="col-md-4">
          <div className="card border-primary shadow-sm">
            <div className="card-header bg-primary text-white text-center fw-bold">
              🔄 In Progress
            </div>
            <div className="card-body">
              {todos.filter(todo => todo.status === "In Progress").length === 0 ? (
                <p className="text-center text-muted">No tasks in progress</p>
              ) : (
                todos
                  .filter(todo => todo.status === "In Progress")
                  .map((todo) => (
                    <div key={todo.id} className="alert alert-light d-flex justify-content-between align-items-center">
                      <span>{todo.text}</span>
                      <div>
                        <button className="btn btn-sm btn-success me-2" onClick={() => changeStatus(todo.id, "Completed")}>
                          <FaCheck /> Complete
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Completed Section */}
        <div className="col-md-4">
          <div className="card border-success shadow-sm">
            <div className="card-header bg-success text-white text-center fw-bold">
              ✅ Completed
            </div>
            <div className="card-body">
              {todos.filter(todo => todo.status === "Completed").length === 0 ? (
                <p className="text-center text-muted">No completed tasks</p>
              ) : (
                todos
                  .filter(todo => todo.status === "Completed")
                  .map((todo) => (
                    <div key={todo.id} className="alert alert-light d-flex justify-content-between align-items-center">
                      <span className="text-decoration-line-through">{todo.text}</span>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
