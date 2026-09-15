import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoItem({ todo, onToggle, onDelete }) {
    // 表示形式: シャンプー (3回分)
    const displayText = `${todo.name} (${todo.quantity}${todo.unit})`;

    return (
        
        <ListItem
            divider
            secondaryAction={
                //削除ボタン
                <IconButton edge="end" color="error" onClick={() => onDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            {/* 完了状態の切り替えチェックボックス */}
            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {/* 持ち物名と数量・単位のテキスト表示（完了時は取り消し線と文字色を変更） */}
            <ListItemText
                primary={displayText}
                sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.disabled' : 'text.primary',
                }}
            />
        </ListItem>
    );
}