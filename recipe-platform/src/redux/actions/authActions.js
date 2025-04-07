import { mockAuthAPI } from '../../services/mockAPI';

export const loginRequest = () => ({ type: 'LOGIN_REQUEST' });
export const loginSuccess = (user) => ({ type: 'LOGIN_SUCCESS', payload: user });
export const loginFailure = (error) => ({ type: 'LOGIN_FAILURE', payload: error });

export const signupRequest = () => ({ type: 'SIGNUP_REQUEST' });
export const signupSuccess = (user) => ({ type: 'SIGNUP_SUCCESS', payload: user });
export const signupFailure = (error) => ({ type: 'SIGNUP_FAILURE', payload: error });

export const logout = () => ({ type: 'LOGOUT' });

export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await mockAuthAPI.login(credentials);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const signup =(userData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const user = await mockAuthAPI.signup(userData);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(signupSuccess(user));
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

export const checkAuthStatus = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(loginSuccess(JSON.parse(user)));
  }
};
