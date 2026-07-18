import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../ThreadItem';

var mockStore = configureStore({
  reducer: {
    users: function () {
      return {
        users: [
          { id: 'user-1', name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random' },
        ],
      };
    },
    auth: function () { return { user: null, token: null }; },
  },
});

function Wrapper(Story) {
  return React.createElement(
    Provider, { store: mockStore },
    React.createElement(BrowserRouter, null, React.createElement(Story)),
  );
}

var baseThread = {
  id: 'thread-1',
  title: 'Bagaimana cara belajar React secara efektif?',
  body: 'Saya ingin mempelajari React untuk pengembangan front-end...',
  category: 'Tanya',
  createdAt: '2024-01-15T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 5,
};

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [Wrapper],
};

export var Default = function () {
  return React.createElement(ThreadItem, { thread: baseThread });
};

export var WithLongBody = function () {
  return React.createElement(ThreadItem, {
    thread: Object.assign({}, baseThread, {
      body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
  });
};

export var WithVotes = function () {
  return React.createElement(ThreadItem, {
    thread: Object.assign({}, baseThread, {
      upVotesBy: ['user-2', 'user-3'],
      downVotesBy: ['user-4'],
    }),
  });
};
