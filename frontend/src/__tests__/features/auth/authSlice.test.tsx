import authReducer, { setCredentials, logout } from '../../../features/auth/authSlice';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

describe('authSlice', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const user = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User'
};

    const token = 'test-token';
    const actual = authReducer(initialState, setCredentials({ user, token }));
    expect(actual.user).toEqual(user);
    expect(actual.token).toBe(token);
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
const state = {
  user: {
    id: '1',
    username: 'test',
    email: 'test@test.com',
    name: 'Test User'
  },
  token: 'token',
  isAuthenticated: true,
};

    const actual = authReducer(state, logout());
    expect(actual).toEqual(initialState);
  });
});
