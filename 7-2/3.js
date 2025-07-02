import { createContext, useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import './TodoList.css';

// 创建TodoContext
const TodoContext = createContext();

// 定义reducer
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id: Date.now(),
                text: action.payload,
                completed: false
            }];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
};

// 提供者组件
function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, []);

    // 添加任务
    const addTodo = (text) => {
        if (text.trim()) {
            dispatch({ type: 'ADD_TODO', payload: text });
        }
    };

    // 切换任务状态
    const toggleTodo = (id) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    // 删除任务
    const deleteTodo = (id) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    // 组件挂载时打印消息
    useEffect(() => {
        console.log('Todo List已加载');
    }, []);

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

// 自定义Hook获取上下文
function useTodoContext() {
    return useContext(TodoContext);
}

// 输入组件
function TodoInput() {
    const { addTodo } = useTodoContext();
    const inputRef = useRef(null);

    const handleAdd = () => {
        if (inputRef.current) {
            addTodo(inputRef.current.value);
            inputRef.current.value = ''; // 清空输入框
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="todo-input">
            <input
                ref={inputRef}
                type="text"
                placeholder="请输入任务..."
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleAdd}>添加</button>
        </div>
    );
}

// 列表项组件
function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                删除
            </button>
        </li>
    );
}

// 列表组件
function TodoList() {
    const { todos, toggleTodo, deleteTodo } = useTodoContext();

    // 使用useMemo优化列表渲染
    const memoizedTodos = useMemo(() => {
        return todos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
        ));
    }, [todos, toggleTodo, deleteTodo]);

    return (
        <ul className="todo-list">
            {memoizedTodos.length === 0 ? (
                <li className="empty-tip">暂无任务</li>
            ) : (
                memoizedTodos
            )}
        </ul>
    );
}

// 主应用组件
function TodoApp() {
    return (
        <TodoProvider>
            <div className="todo-app">
                <h1>Todo List</h1>
                <TodoInput />
                <TodoList />
            </div>
        </TodoProvider>
    );
}

export default TodoApp;