import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  IconButton,
  Button,
  LinearProgress,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import TodosService from "../../services/TodosService";
import { TOKEN } from "../../utils/constants";
import logo from "../../group.svg";
import "./Todos.css";
import { removeCookie } from "../../utils/cookie-handler";

const Todos = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
  const [filter, setFilter] = useState(0);
  const [newTodo, setNewTodo] = useState("");
  const [triggerLoad, setTriggerLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const todoSaved = await TodosService.save(newTodo);

      if (todoSaved) {
        setNewTodo("");
        setTriggerLoad(!triggerLoad);
      }
    }
  };

  const handleUpdate = async (todo: any) => {
    const todoUpdated = await TodosService.update(todo.id);
    if (todoUpdated) {
      setTriggerLoad(!triggerLoad);
    }
  };

  const handleDelete = async (todo: any) => {
    const todoDeleted = await TodosService.remove(todo.id);
    if (todoDeleted) {
      setTriggerLoad(!triggerLoad);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      const todos = await TodosService.loadAll();

      if (todos) {
        setTodos(todos);
      }

      setLoading(false);
    };
    getTodos();
  }, [triggerLoad]);

  useEffect(() => {
    if (filter === 0) {
      setFilteredTodos(todos);
    } else if (filter === 1) {
      setFilteredTodos(todos.filter((todo) => todo.status));
    } else if (filter === -1) {
      setFilteredTodos(todos.filter((todo) => !todo.status));
    }
  }, [filter, todos]);

  const logout = () => {
    removeCookie(TOKEN);
    window.location.href = "/login";
  };

  return (
    <div className="todos-container">
      <div className="todos-body-container">
        <div className="todos-header">
          <img src={logo} alt="logo" />
          <div className="title">Todo List</div>
        </div>

        {!isLoading ? (
          <div>
            <TextField
              className="todo-input"
              id="todo-input-id"
              variant="standard"
              label="Add a new todo"
              type="text"
              value={newTodo}
              onChange={handleTodoChange}
              onKeyDown={handleSubmit}
            />
            {filteredTodos
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((todo: any) => (
                <div key={todo.id} className="todo-item">
                  <div className="todo-item-left-wrapper">
                    <Checkbox
                      checked={todo.status}
                      onChange={() => handleUpdate(todo)}
                    />
                    <div>{todo.title}</div>
                  </div>
                  <IconButton
                    color="default"
                    aria-label="delete todo"
                    component="label"
                    onClick={() => handleDelete(todo)}
                  >
                    <MdClose />
                  </IconButton>
                </div>
              ))}
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
      <div className="todos-footer">
        <div className="todos-filter">
          <div className="filter-label">Show:</div>
          <Button onClick={() => setFilter(0)}>All</Button>
          <Button onClick={() => setFilter(1)}>Completed</Button>
          <Button onClick={() => setFilter(-1)}>Incompleted</Button>
        </div>
        <div className="logout">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
