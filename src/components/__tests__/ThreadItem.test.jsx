/**
 * Skenario pengujian untuk ThreadItem
 *
 * - Menampilkan judul thread
 * - Menampilkan potongan body thread jika panjang
 * - Menampilkan total komentar
 * - Menampilkan nama pembuat thread
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../ThreadItem';

const createMockStore = (users) => configureStore({
  reducer: {
    users: () => ({ users }),
    auth: () => ({ user: null, token: null }),
  },
});

const baseThread = {
  id: 'thread-1',
  title: 'Cara belajar React',
  body: 'Saya ingin belajar React',
  category: 'Tanya',
  createdAt: '2024-01-15T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 3,
};

const mockUsers = [
  { id: 'user-1', name: 'John Doe', avatar: 'https://example.com/avatar.jpg' },
];

describe('ThreadItem component', () => {
  it('harus menampilkan judul thread', () => {
    const store = createMockStore(mockUsers);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={baseThread} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Cara belajar React')).toBeInTheDocument();
  });

  it('harus menampilkan jumlah komentar', () => {
    const store = createMockStore(mockUsers);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={baseThread} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/3 comments/)).toBeInTheDocument();
  });

  it('harus menampilkan nama pembuat thread', () => {
    const store = createMockStore(mockUsers);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={baseThread} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('harus menampilkan "Unknown" jika owner tidak ditemukan di users', () => {
    const store = createMockStore([]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadItem thread={baseThread} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
