import React from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function TodoInput({ text, setText, onAdd }) {
    const handleKeyDown = (e) => {
        // 日本語変換中のEnterキー誤動作を防止
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            onAdd();
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
            <TextField
                fullWidth
                size="small"
                placeholder="新しいタスク"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button 
                variant="contained" 
                onClick={onAdd}
                sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                追加
            </Button>
        </Box>
    );
}