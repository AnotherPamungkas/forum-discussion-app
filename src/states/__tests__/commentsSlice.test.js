/**
 * Skenario pengujian untuk commentsSlice
 *
 * - Thunk asyncCreateComment: membuat komentar baru pada thread
 */

import store from '../store';
import { asyncCreateComment } from '../commentsSlice';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('commentsSlice thunk', () => {
  describe('asyncCreateComment', () => {
    beforeEach(() => {
      store.dispatch({ type: 'comments/create/fulfilled' });
    });

    it('harus tidak error ketika create comment berhasil', async () => {
      const mockComment = {
        id: 'comment-1',
        content: 'Komentar baru',
        createdAt: '2024-01-15T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: { id: 'user-1', name: 'John' },
      };
      api.createComment.mockResolvedValue({
        status: 'success',
        data: { comment: mockComment },
      });

      await store.dispatch(
        asyncCreateComment({ threadId: 'thread-1', content: 'Komentar baru' }),
      );

      const { error } = store.getState().comments;
      expect(error).toBeNull();
    });

    it('harus menyimpan error ketika create comment gagal', async () => {
      api.createComment.mockResolvedValue({
        status: 'fail',
        message: 'Thread tidak ditemukan',
      });

      await store.dispatch(
        asyncCreateComment({ threadId: 'thread-xxx', content: 'Komentar' }),
      );

      const { error } = store.getState().comments;
      expect(error).toBe('Thread tidak ditemukan');
    });
  });
});
