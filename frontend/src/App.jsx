import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [editingIdTodo, setEditingIdTodo] = useState();

  console.log(todos, newTodo);

  async function getTodos() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/todo/get-todos"
      );

      if (response.data.success) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }
  }

  async function createTodo() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/todo/create-todo",
        {
          text: newTodo,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(response.data.allTodos);
        setNewTodo("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }

  async function editTodo() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/todo/edit-todo",
        { 
          todoId: editingIdTodo,
          newTodoText: editedTodo,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(response.data.allTodos);
        setEditingIdTodo("")
        setEditedTodo("")
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/todo/delete-todo",
        { todoId: id }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(response.data.allTodos);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  function handleEdit(id) {
    setEditingIdTodo(id)
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div
        style={{
          height: "40px",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <h1>Todo</h1>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />{" "}
        <button onClick={createTodo}>Add Todo</button>
      </div>

      {/* Map todos here */}
      {todos.length > 0 &&
        todos.map((todo, i) => (
          <>
            {editingIdTodo === todo._id ? (
              <div style={{
                display: "flex",
                width: "50%",
                height: "40px",
                border: "2px solid black",
                margin: "auto",
                justifyContent: "space-around",
              }}>{i + 1}.
                <input
                value={editedTodo}
                placeholder={todo.text}
                  type="text"
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={editTodo}>Submit updated todo</button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  border: "2px solid black",
                  margin: "auto",
                  justifyContent: "space-around",
                }}
                key={todo._id}
              >
                <p style={{ width: "50%" }}>
                  {i + 1} . {todo.text}
                </p>
                <button
                  style={{ width: "20%" }}
                  onClick={() => handleEdit(todo._id)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  style={{ width: "20%" }}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        ))}
    </>
  );
}

export default App;
