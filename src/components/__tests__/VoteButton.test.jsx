/**
 * Skenario pengujian untuk VoteButton
 *
 * - Menampilkan jumlah vote yang benar
 * - Tombol upvote berwarna merah ketika sudah di-upvote
 * - Tombol downvote berwarna biru ketika sudah di-downvote
 * - Klik tombol upvote memanggil handler onUpVote
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import VoteButton from '../VoteButton';

const createMockStore = (authState) => configureStore({
  reducer: {
    auth: () => authState,
  },
});

describe('VoteButton component', () => {
  it('harus menampilkan jumlah vote yang benar', () => {
    const store = createMockStore({ user: { id: 'user-1' }, token: 'token' });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <VoteButton
            upVotesBy={['user-2', 'user-3']}
            downVotesBy={['user-4']}
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('tombol upvote harus memiliki class upvoted jika user sudah upvote', () => {
    const store = createMockStore({ user: { id: 'user-1' }, token: 'token' });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <VoteButton
            upVotesBy={['user-1']}
            downVotesBy={[]}
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const upvoteBtn = container.querySelector('.vote-btn:first-child');
    expect(upvoteBtn).toHaveClass('upvoted');
  });

  it('tombol downvote harus memiliki class downvoted jika user sudah downvote', () => {
    const store = createMockStore({ user: { id: 'user-1' }, token: 'token' });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <VoteButton
            upVotesBy={[]}
            downVotesBy={['user-1']}
            onUpVote={() => {}}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const downvoteBtn = container.querySelector('.vote-btn:last-child');
    expect(downvoteBtn).toHaveClass('downvoted');
  });

  it('harus memanggil onUpVote ketika tombol upvote diklik', () => {
    const store = createMockStore({ user: { id: 'user-1' }, token: 'token' });
    const handleUpVote = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <VoteButton
            upVotesBy={[]}
            downVotesBy={[]}
            onUpVote={handleUpVote}
            onDownVote={() => {}}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const upvoteBtn = container.querySelector('.vote-btn:first-child');
    fireEvent.click(upvoteBtn);
    expect(handleUpVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil onDownVote ketika tombol downvote diklik', () => {
    const store = createMockStore({ user: { id: 'user-1' }, token: 'token' });
    const handleDownVote = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <VoteButton
            upVotesBy={[]}
            downVotesBy={[]}
            onUpVote={() => {}}
            onDownVote={handleDownVote}
            onNeutralize={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const downvoteBtn = container.querySelector('.vote-btn:last-child');
    fireEvent.click(downvoteBtn);
    expect(handleDownVote).toHaveBeenCalledTimes(1);
  });
});
