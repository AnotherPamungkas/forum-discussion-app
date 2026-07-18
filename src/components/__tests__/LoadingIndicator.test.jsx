/**
 * Skenario pengujian untuk LoadingIndicator
 *
 * - Komponen harus me-render spinner loading
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator component', () => {
  it('harus menampilkan spinner loading dengan class loading-spinner', () => {
    render(<LoadingIndicator />);

    const container = screen.getByRole('status').parentElement;
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('loading-container');
  });
});
