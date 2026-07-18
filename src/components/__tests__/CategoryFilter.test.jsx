/**
 * Skenario pengujian untuk CategoryFilter
 *
 * - Menampilkan tombol All dan kategori-kategori yang diberikan
 * - Tombol kategori yang aktif memiliki class active
 * - Klik tombol kategori memanggil onSelectCategory dengan nilai yang benar
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../CategoryFilter';

describe('CategoryFilter component', () => {
  const categories = ['Tanya', 'Diskusi', 'Berita'];

  it('harus menampilkan tombol All dan semua kategori', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onSelectCategory={() => {}}
      />,
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Tanya')).toBeInTheDocument();
    expect(screen.getByText('Diskusi')).toBeInTheDocument();
    expect(screen.getByText('Berita')).toBeInTheDocument();
  });

  it('tombol All harus memiliki class active ketika activeCategory kosong', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onSelectCategory={() => {}}
      />,
    );

    const allBtn = screen.getByText('All');
    expect(allBtn).toHaveClass('active');
  });

  it('tombol kategori yang aktif harus memiliki class active', () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="Diskusi"
        onSelectCategory={() => {}}
      />,
    );

    const diskusiBtn = screen.getByText('Diskusi');
    expect(diskusiBtn).toHaveClass('active');

    const tanyaBtn = screen.getByText('Tanya');
    expect(tanyaBtn).not.toHaveClass('active');
  });

  it('harus memanggil onSelectCategory dengan kategori yang dipilih', () => {
    const handleSelect = jest.fn();

    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onSelectCategory={handleSelect}
      />,
    );

    fireEvent.click(screen.getByText('Berita'));
    expect(handleSelect).toHaveBeenCalledWith('Berita');

    fireEvent.click(screen.getByText('All'));
    expect(handleSelect).toHaveBeenCalledWith('');
  });
});
