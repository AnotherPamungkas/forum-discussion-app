/**
 * Skenario pengujian untuk votesSlice
 *
 * - Thunk asyncUpVoteThread: melakukan up-vote pada thread
 * - Thunk asyncDownVoteThread: melakukan down-vote pada thread
 */

import store from '../store';
import { asyncUpVoteThread, asyncDownVoteThread } from '../votesSlice';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('votesSlice thunk', () => {
  describe('asyncUpVoteThread', () => {
    it('harus tidak error ketika up-vote berhasil', async () => {
      api.upVoteThread.mockResolvedValue({
        status: 'success',
        data: { vote: { id: 'thread-1', voteType: 1 } },
      });

      await store.dispatch(asyncUpVoteThread('thread-1'));

      const { error } = store.getState().votes;
      expect(error).toBeNull();
    });

    it('harus menyimpan error ketika up-vote gagal', async () => {
      api.upVoteThread.mockResolvedValue({
        status: 'fail',
        message: 'Anda harus login terlebih dahulu',
      });

      await store.dispatch(asyncUpVoteThread('thread-1'));

      const { error } = store.getState().votes;
      expect(error).toBe('Anda harus login terlebih dahulu');
    });
  });

  describe('asyncDownVoteThread', () => {
    it('harus tidak error ketika down-vote berhasil', async () => {
      api.downVoteThread.mockResolvedValue({
        status: 'success',
        data: { vote: { id: 'thread-1', voteType: -1 } },
      });

      await store.dispatch(asyncDownVoteThread('thread-1'));

      const { error } = store.getState().votes;
      expect(error).toBeNull();
    });

    it('harus menyimpan error ketika down-vote gagal', async () => {
      api.downVoteThread.mockResolvedValue({
        status: 'fail',
        message: 'Token tidak valid',
      });

      await store.dispatch(asyncDownVoteThread('thread-1'));

      const { error } = store.getState().votes;
      expect(error).toBe('Token tidak valid');
    });
  });
});
