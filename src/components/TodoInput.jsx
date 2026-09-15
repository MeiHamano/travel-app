import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function TodoInput({ onAdd }) {

    //入力フォームの状態管理
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('個');

    //追加処理
    const handleAddClick = () => {
        if (!name.trim()) return;

        const validQuantity = parseInt(quantity, 10);
        onAdd({
            name: name.trim(),
            //数値以外の入力や1未満の場合は1
            quantity: isNaN(validQuantity) || validQuantity < 1 ? 1 : validQuantity,
            unit: unit.trim() || '個',
        });

        // フォームのリセット
        setName('');
        setQuantity(1);
        setUnit('個');
    };

    const handleKeyDown = (e) => {
        // 日本語変換中のEnterキー誤動作を防止
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            handleAddClick();
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2, alignItems: 'center' }}>
            {/* 持ち物名入力 */}
            <TextField
                fullWidth
                size="small"
                placeholder="持ち物を入力"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {/* 数量入力 */}
            <TextField
                type="number"
                size="small"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyDown={handleKeyDown}
                inputprops={{ min: 1, style: { width: '45px', textAlign: 'center' } }}
            />

            {/* 単位入力 */}
            <TextField
                size="small"
                placeholder="単位"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                onKeyDown={handleKeyDown}
                inputprops={{ style: { width: '40px', textAlign: 'center' } }}
            />

            {/* 追加ボタン */}
            <Button
                variant="contained"
                onClick={handleAddClick}
                sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
                追加
            </Button>
        </Box>
    );
}