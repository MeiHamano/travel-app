import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <ListItem
            divider
            secondaryAction={
                
                <IconButton edge="end" color="error" onClick={() => onDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <ListItemText
                primary={todo.text}
                sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.disabled' : 'text.primary',
                }}
            />
        </ListItem>
    );
}