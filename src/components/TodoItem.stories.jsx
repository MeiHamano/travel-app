import React from 'react';
import TodoItem from './TodoItem';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
  argTypes: {
    onToggle: { action: 'toggled' },
    onDelete: { action: 'deleted' },
  },
};
//1.完了していないタスク
export const Incomplete = {
  args: {
    todo: {
      id: 1,
      text: 'ヘアアイロン',
      completed: false,
    },
  },
};

//2.完了したタスク
export const Completed = {
  args: {
    todo: {
      id: 2,
      text: '充電器',
      completed: true,
    },
  },
};