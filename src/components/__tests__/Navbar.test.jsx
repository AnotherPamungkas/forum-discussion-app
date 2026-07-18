/**
 * Skenario pengujian untuk Navbar
 *
 * - Saat tidak login, menampilkan link Login dan Register
 * - Navigasi link berfungsi
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../Navbar';

const createMockStore = (authState) => configureStore({
  reducer: {
    auth: () => authState,
  },
});

describe('Navbar component', () => {
  it('harus menampilkan link Login dan Register ketika tidak login', () => {
    const store = createMockStore({ user: null, token: null });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('harus menampilkan nama user dan tombol Logout ketika sudah login', () => {
    const store = createMockStore({
      user: { id: 'user-1', name: 'John Doe' },
      token: 'mock-token',
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });
});
