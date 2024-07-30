import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [todoValue, setTodoValue] = useState('');

    function persistData(newList) {
        localStorage.setItem('todos', JSON.stringify({ todos: newList }));
    }

    function handleAddTodos(newTodo) {
        const newTodoList = [...todos, newTodo];
        persistData(newTodoList);
        setTodos(newTodoList);
        setTodoValue(''); // Clear input after adding
    }

    function handleDeleteTodo(index) {
        const newTodoList = todos.filter((todo, todoIndex) => todoIndex !== index);
        persistData(newTodoList);
        setTodos(newTodoList);
    }

    function handleEditTodo(index) {
        const valueToBeEdited = todos[index];
        setTodoValue(valueToBeEdited);
        handleDeleteTodo(index); // Remove item to update
    }

    useEffect(() => {
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
            const parsedTodos = JSON.parse(localTodos).todos;
            setTodos(parsedTodos);
        }
    }, []);

    return (
        <>
            <TodoInput
                todoValue={todoValue}
                setTodoValue={setTodoValue}
                handleAddTodos={handleAddTodos}
            />
            <TodoList
                todos={todos}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
            />
        </>
    );
}

export default App;
