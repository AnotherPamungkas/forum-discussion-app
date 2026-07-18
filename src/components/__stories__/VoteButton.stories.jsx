import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import VoteButton from '../VoteButton';

function mockStore(user) {
  return configureStore({
    reducer: {
      auth: function () { return { user: user, token: user ? 'token' : null }; },
    },
  });
}

function createVoteStory(args) {
  var store = mockStore({ id: 'user-1', name: 'John' });
  return React.createElement(
    Provider, { store: store },
    React.createElement(VoteButton, args),
  );
}

export default {
  title: 'Components/VoteButton',
  component: VoteButton,
};

export var Neutral = function () {
  return createVoteStory({
    upVotesBy: [],
    downVotesBy: [],
    onUpVote: function () { return alert('Up voted'); },
    onDownVote: function () { return alert('Down voted'); },
    onNeutralize: function () { return alert('Neutralized'); },
  });
};

export var Upvoted = function () {
  return createVoteStory({
    upVotesBy: ['user-1'],
    downVotesBy: [],
    onUpVote: function () { return alert('Up voted'); },
    onDownVote: function () { return alert('Down voted'); },
    onNeutralize: function () { return alert('Neutralized'); },
  });
};

export var Downvoted = function () {
  return createVoteStory({
    upVotesBy: [],
    downVotesBy: ['user-1'],
    onUpVote: function () { return alert('Up voted'); },
    onDownVote: function () { return alert('Down voted'); },
    onNeutralize: function () { return alert('Neutralized'); },
  });
};
