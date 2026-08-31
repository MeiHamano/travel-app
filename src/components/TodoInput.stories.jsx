import React, { useState } from 'react';
import TodoInput from './TodoInput';

export default {
  title: 'Components/TodoInput',
  component: TodoInput,
  argTypes: {
    onAdd: { action: 'added' },
  },
};

// 1. 空の入力フォーム
export const Default = () => {
  const [text, setText] = useState('');
  return (
    <TodoInput
      text={text}
      setText={setText}
      onAdd={() => {
        alert(`追加されました: ${text}`);
        setText('');
      }}
    />
  );
};

// 2. 文字が最初から入っている状態
export const WithText = () => {
  const [text, setText] = useState('入力途中のタスク');
  return (
    <TodoInput
      text={text}
      setText={setText}
      onAdd={() => setText('')}
    />
  );
};