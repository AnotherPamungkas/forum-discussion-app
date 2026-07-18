/**
 * Skenario E2E Login
 *
 * - Login dengan credential yang salah menampilkan pesan error
 * - Login dengan credential yang benar mengarahkan ke halaman utama
 */

describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus menampilkan pesan error ketika login gagal', () => {
    cy.get('input[type="email"]').type('salah@test.com');
    cy.get('input[type="password"]').type('password_salah');

    cy.get('button[type="submit"]').click();

    cy.contains(/email or password/i).should('be.visible');
  });

  it('harus mengarahkan ke halaman utama ketika login berhasil', () => {
    cy.get('input[type="email"]').type('dicoding@dicoding.com');
    cy.get('input[type="password"]').type('super2020');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Threads').should('be.visible');
  });
});
