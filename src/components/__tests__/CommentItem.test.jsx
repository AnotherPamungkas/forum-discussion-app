/**
 * Skenario pengujian untuk CommentItem
 *
 * - Menampilkan konten komentar
 * - Menampilkan nama pemilik komentar
 * - Menampilkan avatar pemilik komentar
 * - Menampilkan VoteButton dengan props yang benar
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CommentItem from '../CommentItem';

const createMockStore = (authState) => configureStore({
  reducer: {
    auth: () => authState,
  },
});

const baseComment = {
  id: 'comment-1',
  content: 'Isi komentar untuk thread ini',
  createdAt: '2024-01-15T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
  },
};

describe('CommentItem component', () => {
  it('harus menampilkan konten komentar', () => {
    const store = createMockStore({ user: { id: 'user-2' }, token: 'token' });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentItem
            comment={baseComment}
            threadId="thread-1"
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Isi komentar untuk thread ini')).toBeInTheDocument();
  });

  it('harus menampilkan nama pemilik komentar', () => {
    const store = createMockStore({ user: { id: 'user-2' }, token: 'token' });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentItem
            comment={baseComment}
            threadId="thread-1"
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('harus menampilkan avatar dengan alt text yang benar', () => {
    const store = createMockStore({ user: { id: 'user-2' }, token: 'token' });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentItem
            comment={baseComment}
            threadId="thread-1"
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('harus menampilkan "Unknown" jika owner tidak ada', () => {
    const store = createMockStore({ user: { id: 'user-2' }, token: 'token' });
    const commentWithoutOwner = { ...baseComment, owner: null };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentItem
            comment={commentWithoutOwner}
            threadId="thread-1"
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('harus menampilkan VoteButton dengan vote count yang benar', () => {
    const store = createMockStore({ user: { id: 'user-2' }, token: 'token' });
    const commentWithVotes = {
      ...baseComment,
      upVotesBy: ['user-1'],
      downVotesBy: ['user-3'],
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentItem
            comment={commentWithVotes}
            threadId="thread-1"
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
