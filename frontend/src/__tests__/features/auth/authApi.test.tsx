import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../../../features/auth/authApi';
import authReducer from '../../../features/auth/authSlice';

const server = setupServer(
  http.post('http://localhost:9003/api/auth/login', async () => {
    return HttpResponse.json({
      user: { id: 1, email: 'test@example.com' },
      token: 'mock-token',
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('authApi', () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,
    },
    middleware: (gDM) => gDM().concat(authApi.middleware),
  });

  it('logs in user successfully', async () => {
    const result = await store.dispatch(
      authApi.endpoints.login.initiate({ email: 'test@example.com', password: '123456' })
    );

    if ('data' in result) {
      expect(result.data).toEqual({
        user: { id: 1, email: 'test@example.com' },
        token: 'mock-token',
      });
    } else {
      throw new Error('Login failed');
    }
  });
});
