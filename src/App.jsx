import { useState } from 'react';
import { Container, Typography, List } from '@mui/material';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

export default function App() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);

    const remainingCount = todos.filter((todo) => !todo.completed).length;

    const handleAdd = () => {
        if (!text.trim()) return;
        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setText('');
    };

    const handleToggle = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>TODOリスト</Typography>
            
            {/* onAddd -> onAdd に修正 */}
            <TodoInput text={text} setText={setText} onAdd={handleAdd} />

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                残りタスク: {remainingCount} 件
            </Typography>

            <List disablePadding>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </List>
        </Container>
    );
}