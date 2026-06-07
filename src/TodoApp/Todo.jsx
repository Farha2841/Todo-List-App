import React,{useState} from 'react'
import './Todo.css'
import { MdDelete } from "react-icons/md";


const Todo = () => {
    const [todo,setTodos] = useState([]);

    const [input,setInput] = useState("");

    const handleAddTodo = (e) => {
        e.preventDefault();

        if(!input.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
        }
        setTodos([...todo,newTodo])
        setInput("")
    }

    const toggleComplete = (id) => {
        setTodos(
            todo.map((t) => 
            t.id === id? {...t,completed: !t.completed} : t)
        )
    }

    const handleDelete = (id) => {
        setTodos(todo.filter((t) => t.id !== id))
    }
  return (
    <div>
        <div className="todo-container">
            <h1>Todo List</h1>
        </div>

        <form action="#" onSubmit = {handleAddTodo}>
            <input type="text" placeholder="Add new task" value={input} onChange={(e) => setInput(e.target.value)}/>
            <button type="submit">Add Task</button>
        </form>

        <ul className="todo-list">
            {todo.map((todo) => (
            <li
                 key={todo.id}
                className={todo.completed ? "completed" : ""} >
                <span>{todo.text}</span>

            <div className="btn-group">
            <button
            className="complete-btn"
            onClick={() => toggleComplete(todo.id)}
            >
            {todo.completed ? "Undo" : "Complete"}
            </button>

            <button
            className="delete-btn"
            onClick={() => handleDelete(todo.id)}
            >
            <MdDelete />
            </button>
            </div>
    </li>
  ))}
        </ul>
    </div>
  )
}

export default Todo