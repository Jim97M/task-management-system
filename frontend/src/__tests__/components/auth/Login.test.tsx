
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../__tests__/test-utils';
import Login from '../../../pages/Login';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.post('http://localhost:9003/api/auth/login', async ({ request }) => {
    const credentials = await request.json() as { email: string; password: string };
    
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      return HttpResponse.json({
        user: { id: 1, email: 'test@example.com' },
        token: 'auth-token'
      });
    }
    
    return HttpResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

describe('Login Component', () => {
  it('renders login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText('Sign In to Your Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

it('shows validation errors on submit with empty fields', async () => {
  renderWithProviders(<Login />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: 'Sign In' }));

  screen.debug();

});

  it('successfully logs in with valid credentials', async () => {
    const { store } = renderWithProviders(<Login />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      const authState = store.getState().auth;
      expect(authState.isAuthenticated).toBe(true);
      expect(authState.user?.email).toBe('test@example.com');
      expect(authState.token).toBe('auth-token');
    });
  });

  it('shows error message with invalid credentials', async () => {
    renderWithProviders(<Login />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText('Email'), 'wrong@email.com');
    await user.type(screen.getByLabelText('Password'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));


  });
});
