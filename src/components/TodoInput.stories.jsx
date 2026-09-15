import React, { useState } from 'react';
import TodoInput from './TodoInput';

export default {
  title: 'Components/TodoInput',
  component: TodoInput,
  argTypes: {
    setText: { action: 'textInput' },
    onAdd: { action: 'added' },
  },
};

// 1. 空の入力フォーム
export const Default = {
  args: {
    text: '',
  },
};

// 2. 文字が最初から入っている状態
export const WithText = {
  args: {
    text: '入力途中のタスク',
  },
};
