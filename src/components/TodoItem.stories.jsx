import TodoItem from './TodoItem';
import { List } from '@mui/material';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <List sx={{ width: 360, bgcolor: 'background.paper' }}>
        <Story />
      </List>
    ),
  ],
  argTypes: {
    onToggle: { action: 'toggled' },
    onDelete: { action: 'deleted' },
  },
};
//1.完了していないタスク
export const Incomplete = {
  args: {
    todo: {
      id: 'item-1',
      name: 'シャンプー',
      quantity: 3,
      unit: '回分',
      completed: false,
    },
  },
};

//2.完了したタスク
export const Completed = {
  args: {
    todo: {
      id: 'item-2',
      name: 'パスポート',
      quantity: 1,
      unit: '冊',
      completed: true,
    },
  },
};

// 3. 手動追加アイテム
export const CustomItem = {
  args: {
    todo: {
      id: 'item-3',
      name: '常備薬',
      quantity: 5,
      unit: '包',
      completed: false,
    },
  },
};