/**
 * Skenario pengujian untuk leaderboardSlice
 *
 * - Thunk asyncGetLeaderboards: mengambil data leaderboard dari API
 */

import store from '../store';
import { asyncGetLeaderboards } from '../leaderboardSlice';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('leaderboardSlice thunk', () => {
  describe('asyncGetLeaderboards', () => {
    it('harus mengisi leaderboards dengan data dari API', async () => {
      const mockLeaderboards = [
        {
          user: { id: 'user-1', name: 'John', email: 'john@test.com' },
          score: 100,
        },
      ];
      api.getLeaderboards.mockResolvedValue({
        status: 'success',
        data: { leaderboards: mockLeaderboards },
      });

      await store.dispatch(asyncGetLeaderboards());

      const { leaderboards } = store.getState().leaderboard;
      expect(leaderboards).toEqual(mockLeaderboards);
      expect(leaderboards).toHaveLength(1);
    });

    it('harus menyimpan error ketika request gagal', async () => {
      api.getLeaderboards.mockResolvedValue({
        status: 'fail',
        message: 'Gagal mengambil data',
      });

      await store.dispatch(asyncGetLeaderboards());

      const { error } = store.getState().leaderboard;
      expect(error).toBe('Gagal mengambil data');
    });
  });
});
