import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    List,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

// 要件定義書の定義に合わせたマスターデータ
const DEFAULT_ITEMS = [
    { key: 'shampoo', name: 'シャンプー', unit: '回分', type: 'daily' },
    { key: 'clothes', name: '着替え', unit: '着', type: 'daily' },
    { key: 'lotion', name: '化粧水', unit: '本', type: 'fixed' },
    { key: 'makeup', name: 'メイク道具', unit: '式', type: 'fixed' },
    { key: 'charger', name: '充電器', unit: '個', type: 'fixed' },
    { key: 'passport', name: 'パスポート', unit: '冊', type: 'overseas' },
];

export default function App() {
    // 確定済みの旅行条件
    const [isOverseas, setIsOverseas] = useState(false);
    const [nights, setNights] = useState(2);

    // ダイアログ・変更保留用のState
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingChange, setPendingChange] = useState(null); 
    // 例: { type: 'overseas', value: true } や { type: 'nights', value: 3 }

    // タスク一覧
    const [todos, setTodos] = useState([]);

    // 条件（泊数・旅行先）に応じたデフォルト荷物を再計算・同期する処理
    useEffect(() => {
        setTodos((prevTodos) => {
            // ユーザー手動追加タスクを保持
            const customTodos = prevTodos.filter((todo) => !todo.isDefault);

            // 既存デフォルトタスクの完了状態を保持
            const completedMap = new Map();
            prevTodos
                .filter((todo) => todo.isDefault)
                .forEach((todo) => {
                    completedMap.set(todo.itemKey, todo.completed);
                });

            // 現在の条件に該当するデフォルト項目を生成
            const newDefaultTodos = DEFAULT_ITEMS
                .filter((item) => {
                    if (item.type === 'overseas') return isOverseas;
                    return true;
                })
                .map((item) => {
                    const quantity = item.type === 'daily' ? Math.max(1, nights) : 1;
                    return {
                        id: `default-${item.key}`,
                        itemKey: item.key,
                        name: item.name,
                        quantity: quantity,
                        unit: item.unit,
                        completed: completedMap.get(item.key) ?? false,
                        isDefault: true,
                    };
                });

            return [...newDefaultTodos, ...customTodos];
        });
    }, [isOverseas, nights]);

    // --- 旅行条件の変更ハンドラー（ダイアログを開く） ---
    const handleRequestOverseasChange = (nextValue) => {
        if (nextValue === isOverseas) return;
        setPendingChange({ type: 'overseas', value: nextValue });
        setDialogOpen(true);
    };

    const handleRequestNightsChange = (nextValue) => {
        const validNights = Math.max(1, parseInt(nextValue, 10) || 1);
        if (validNights === nights) return;
        setPendingChange({ type: 'nights', value: validNights });
        setDialogOpen(true);
    };

    // ダイアログで「OK（変更する）」を押した時
    const handleConfirmChange = () => {
        if (pendingChange) {
            if (pendingChange.type === 'overseas') {
                setIsOverseas(pendingChange.value);
            } else if (pendingChange.type === 'nights') {
                setNights(pendingChange.value);
            }
        }
        setPendingChange(null);
        setDialogOpen(false);
    };

    // ダイアログで「キャンセル」を押した時
    const handleCancelChange = () => {
        setPendingChange(null);
        setDialogOpen(false);
    };

    // --- タスク操作系ハンドラー ---
    const remainingCount = todos.filter((todo) => !todo.completed).length;

    const handleAdd = ({ name, quantity, unit }) => {
        const newTodo = {
            id: Date.now(),
            name: name,
            quantity: quantity,
            unit: unit,
            completed: false,
            isDefault: false,
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    const handleToggle = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDelete = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 3, mb: 5 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                旅行準備TODOリスト
            </Typography>

            {/* 条件設定エリア */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    旅行条件
                </Typography>
                <RadioGroup
                    row
                    value={isOverseas ? 'overseas' : 'domestic'}
                    onChange={(e) => handleRequestOverseasChange(e.target.value === 'overseas')}
                    sx={{ mb: 1.5 }}
                >
                    <FormControlLabel value="domestic" control={<Radio size="small" />} label="国内" />
                    <FormControlLabel value="overseas" control={<Radio size="small" />} label="海外" />
                </RadioGroup>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        type="number"
                        size="small"
                        value={nights}
                        onChange={(e) => handleRequestNightsChange(e.target.value)}
                        inputProps={{ min: 1, style: { width: '50px', textAlign: 'center' } }}
                    />
                    <Typography variant="body2">
                        泊 {nights + 1} 日
                    </Typography>
                </Box>
            </Paper>

            {/* 新規タスク入力フォーム */}
            <TodoInput onAdd={handleAdd} />

            {/* ステータス表示 */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                残りタスク: {remainingCount} 件
            </Typography>

            {/* タスク一覧 */}
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

            {/* 上書き注意喚起ダイアログ */}
            <Dialog open={dialogOpen} onClose={handleCancelChange}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    条件を変更しますか？
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        旅行先や宿泊数を変更すると、デフォルトの持ち物（必要数量や海外専用アイテム）が再計算・上書きされます。
                        <br /><br />
                        ※ご自身で手動追加した持ち物は消えずに残ります。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelChange} color="inherit">
                        キャンセル
                    </Button>
                    <Button onClick={handleConfirmChange} variant="contained" color="primary" autoFocus>
                        変更する
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}