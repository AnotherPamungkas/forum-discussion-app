/**
 * Skenario pengujian untuk authSlice
 *
 * - Reducer logout: menghapus user dan token dari state
 * - Thunk asyncLogin: mengirim request login dan menyimpan token
 * - Thunk asyncRegister: mengirim request registrasi
 */

import store from '../store';
import { logout, asyncLogin, asyncRegister } from '../authSlice';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('authSlice reducer', () => {
  describe('logout', () => {
    it('harus menghapus user dan token dari state', () => {
      store.dispatch({
        type: 'auth/login/fulfilled',
        payload: 'mock-token',
      });
      store.dispatch({
        type: 'auth/getOwnProfile/fulfilled',
        payload: { id: 'user-1', name: 'John' },
      });

      const stateBefore = store.getState().auth;
      expect(stateBefore.token).toBe('mock-token');
      expect(stateBefore.user).toEqual({ id: 'user-1', name: 'John' });

      store.dispatch(logout());

      const stateAfter = store.getState().auth;
      expect(stateAfter.token).toBeNull();
      expect(stateAfter.user).toBeNull();
    });
  });
});

describe('authSlice thunk', () => {
  describe('asyncLogin', () => {
    it('harus menyimpan token ketika login berhasil', async () => {
      const mockToken = 'token-123';
      api.login.mockResolvedValue({
        status: 'success',
        data: { token: mockToken },
      });

      await store.dispatch(
        asyncLogin({ email: 'john@test.com', password: 'secret' }),
      );

      const state = store.getState().auth;
      expect(state.token).toBe(mockToken);
      expect(state.error).toBeNull();
    });

    it('harus menyimpan error ketika login gagal', async () => {
      api.login.mockResolvedValue({
        status: 'fail',
        message: 'Email or password is wrong',
      });

      await store.dispatch(
        asyncLogin({ email: 'wrong@test.com', password: 'wrong' }),
      );

      const state = store.getState().auth;
      expect(state.token).toBe('token-123');
      expect(state.error).toBe('Email or password is wrong');
    });
  });

  describe('asyncRegister', () => {
    it('harus tidak error ketika register berhasil', async () => {
      api.register.mockResolvedValue({
        status: 'success',
        data: { user: { id: 'user-2', name: 'Jane' } },
      });

      await store.dispatch(
        asyncRegister({ name: 'Jane', email: 'jane@test.com', password: 'secret' }),
      );

      const { error } = store.getState().auth;
      expect(error).toBeNull();
    });

    it('harus menyimpan error ketika register gagal', async () => {
      api.register.mockResolvedValue({
        status: 'fail',
        message: 'Email sudah terdaftar',
      });

      await store.dispatch(
        asyncRegister({ name: 'Jane', email: 'jane@test.com', password: 'secret' }),
      );

      const { error } = store.getState().auth;
      expect(error).toBe('Email sudah terdaftar');
    });
  });
});
