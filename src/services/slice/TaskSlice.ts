import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    
}

interface TodoState {
    todos: Todo[];
    deletedTodos: Todo[];
}


const saveToLocalStorage = (todos: Todo[], deletedTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos));
};

// Инициализируем состояния из localStorage
const initialState: TodoState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]') || [],
    deletedTodos: JSON.parse(localStorage.getItem('deletedTodos') || '[]') || []
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Добавляем новую задачу
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo = { id: Date.now(), text: action.payload, completed: false };
            state.todos.push(newTodo);
            saveToLocalStorage(state.todos, state.deletedTodos);
        },
        // Удаляем все задачи
        deleteAllTodo: (state) => {
            state.deletedTodos = [];
            saveToLocalStorage(state.todos, state.deletedTodos);
        },
        // Перемещаем задачу в корзину
        moveToTrash: (state, action: PayloadAction<number>) => {
            const todoToMove = state.todos.find(todo => todo.id === action.payload);
            if (todoToMove) {
                state.deletedTodos.push(todoToMove);
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
                saveToLocalStorage(state.todos, state.deletedTodos);
            }
        },
        // Помечаем задачу как выполненную
        toggleComplete: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveToLocalStorage(state.todos, state.deletedTodos);
            }
        },
    },
});

export const { addTodo, deleteAllTodo, toggleComplete, moveToTrash } = todoSlice.actions;
export default todoSlice.reducer;