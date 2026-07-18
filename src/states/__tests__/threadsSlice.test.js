/**
 * Skenario pengujian untuk threadsSlice
 *
 * - Reducer setThreadVote: mengubah upVotesBy/downVotesBy pada threadDetail
 * - Reducer setThreadListVote: mengubah upVotesBy/downVotesBy pada threads array
 * - Reducer setCommentVote: mengubah upVotesBy/downVotesBy pada komentar
 * - Reducer clearThreadDetail: menghapus threadDetail dari state
 * - Thunk asyncGetAllThreads: mengambil daftar thread dari API
 * - Thunk asyncGetThreadDetail: mengambil detail thread dari API
 */

import store from '../store';
import {
  setThreadVote,
  setThreadListVote,
  setCommentVote,
  clearThreadDetail,
  asyncGetAllThreads,
  asyncGetThreadDetail,
} from '../threadsSlice';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('threadsSlice reducer', () => {
  beforeEach(() => {
    const initialThreads = store.getState().threads;
    if (initialThreads.threadDetail || initialThreads.threads.length > 0) {
      store.dispatch({ type: 'threads/getAll/fulfilled', payload: [] });
      store.dispatch(clearThreadDetail());
    }
  });

  describe('setThreadVote', () => {
    it('harus menambahkan userId ke upVotesBy ketika up-vote', () => {
      store.dispatch({
        type: 'threads/getDetail/fulfilled',
        payload: {
          id: 'thread-1',
          title: 'Test Thread',
          body: 'Body',
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
          owner: { id: 'user-1', name: 'John' },
        },
      });

      store.dispatch(
        setThreadVote({ userId: 'user-2', voteType: 1 }),
      );

      const { threadDetail } = store.getState().threads;
      expect(threadDetail.upVotesBy).toContain('user-2');
      expect(threadDetail.downVotesBy).not.toContain('user-2');
    });

    it('harus menambahkan userId ke downVotesBy ketika down-vote', () => {
      store.dispatch({
        type: 'threads/getDetail/fulfilled',
        payload: {
          id: 'thread-1',
          title: 'Test Thread',
          body: 'Body',
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
          owner: { id: 'user-1', name: 'John' },
        },
      });

      store.dispatch(
        setThreadVote({ userId: 'user-2', voteType: -1 }),
      );

      const { threadDetail } = store.getState().threads;
      expect(threadDetail.downVotesBy).toContain('user-2');
      expect(threadDetail.upVotesBy).not.toContain('user-2');
    });

    it('harus menghapus userId dari kedua array ketika neutralize', () => {
      store.dispatch({
        type: 'threads/getDetail/fulfilled',
        payload: {
          id: 'thread-1',
          title: 'Test Thread',
          body: 'Body',
          upVotesBy: ['user-2'],
          downVotesBy: [],
          comments: [],
          owner: { id: 'user-1', name: 'John' },
        },
      });

      store.dispatch(
        setThreadVote({ userId: 'user-2', voteType: 0 }),
      );

      const { threadDetail } = store.getState().threads;
      expect(threadDetail.upVotesBy).not.toContain('user-2');
      expect(threadDetail.downVotesBy).not.toContain('user-2');
    });
  });

  describe('setThreadListVote', () => {
    it('harus mengupdate thread di dalam array threads', () => {
      store.dispatch({
        type: 'threads/getAll/fulfilled',
        payload: [
          {
            id: 'thread-1',
            title: 'Thread 1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread 2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      });

      store.dispatch(
        setThreadListVote({ threadId: 'thread-1', userId: 'user-1', voteType: 1 }),
      );

      const { threads } = store.getState().threads;
      const thread1 = threads.find((t) => t.id === 'thread-1');
      expect(thread1.upVotesBy).toContain('user-1');
    });
  });

  describe('setCommentVote', () => {
    it('harus menambahkan userId ke upVotesBy komentar ketika up-vote', () => {
      store.dispatch({
        type: 'threads/getDetail/fulfilled',
        payload: {
          id: 'thread-1',
          title: 'Test Thread',
          body: 'Body',
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Komentar',
              upVotesBy: [],
              downVotesBy: [],
              owner: { id: 'user-2', name: 'Jane' },
            },
          ],
          owner: { id: 'user-1', name: 'John' },
        },
      });

      store.dispatch(
        setCommentVote({ userId: 'user-3', commentId: 'comment-1', voteType: 1 }),
      );

      const { threadDetail } = store.getState().threads;
      const comment = threadDetail.comments.find((c) => c.id === 'comment-1');
      expect(comment.upVotesBy).toContain('user-3');
      expect(comment.downVotesBy).not.toContain('user-3');
    });

    it('harus menambahkan userId ke downVotesBy komentar ketika down-vote', () => {
      store.dispatch({
        type: 'threads/getDetail/fulfilled',
        payload: {
          id: 'thread-1',
          title: 'Test Thread',
          body: 'Body',
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Komentar',
              upVotesBy: [],
              downVotesBy: [],
              owner: { id: 'user-2', name: 'Jane' },
            },
          ],
          owner: { id: 'user-1', name: 'John' },
        },
      });

      store.dispatch(
        setCommentVote({ userId: 'user-3', commentId: 'comment-1', voteType: -1 }),
      );

      const { threadDetail } = store.getState().threads;
      const comment = threadDetail.comments.find((c) => c.id === 'comment-1');
      expect(comment.downVotesBy).toContain('user-3');
      expect(comment.upVotesBy).not.toContain('user-3');
    });

    it('harus menghapus userId dari kedua array komentar ketika neutralize', () => {
      store.dispatch({
        type: 'threads/getDetail/fulfilled',
        payload: {
          id: 'thread-1',
          title: 'Test Thread',
          body: 'Body',
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Komentar',
              upVotesBy: ['user-3'],
              downVotesBy: [],
              owner: { id: 'user-2', name: 'Jane' },
            },
          ],
          owner: { id: 'user-1', name: 'John' },
        },
      });

      store.dispatch(
        setCommentVote({ userId: 'user-3', commentId: 'comment-1', voteType: 0 }),
      );

      const { threadDetail } = store.getState().threads;
      const comment = threadDetail.comments.find((c) => c.id === 'comment-1');
      expect(comment.upVotesBy).not.toContain('user-3');
      expect(comment.downVotesBy).not.toContain('user-3');
    });
  });

  describe('clearThreadDetail', () => {
    it('harus mengatur threadDetail menjadi null', () => {
      store.dispatch({
        type: 'threads/getDetail/fulfilled',
        payload: { id: 'thread-1', title: 'Test' },
      });
      expect(store.getState().threads.threadDetail).not.toBeNull();

      store.dispatch(clearThreadDetail());
      expect(store.getState().threads.threadDetail).toBeNull();
    });
  });
});

describe('threadsSlice thunk', () => {
  describe('asyncGetAllThreads', () => {
    it('harus mengisi threads dengan data dari API', async () => {
      const mockThreads = [
        { id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [] },
      ];
      api.getAllThreads.mockResolvedValue({
        status: 'success',
        data: { threads: mockThreads },
      });

      await store.dispatch(asyncGetAllThreads());

      const { threads } = store.getState().threads;
      expect(threads).toEqual(mockThreads);
      expect(threads).toHaveLength(1);
    });
  });

  describe('asyncGetThreadDetail', () => {
    it('harus mengisi threadDetail dengan data dari API', async () => {
      const mockDetail = {
        id: 'thread-1',
        title: 'Detail Thread',
        body: 'Body detail',
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
        owner: { id: 'user-1', name: 'John' },
      };
      api.getThreadDetail.mockResolvedValue({
        status: 'success',
        data: { detailThread: mockDetail },
      });

      await store.dispatch(asyncGetThreadDetail('thread-1'));

      const { threadDetail } = store.getState().threads;
      expect(threadDetail).toEqual(mockDetail);
    });
  });
});
