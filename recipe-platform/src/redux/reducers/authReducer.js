const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'SIGNUP_REQUEST':
        return { ...state, loading: true, error: null };
      case 'LOGIN_SUCCESS':
      case 'SIGNUP_SUCCESS':
        return { ...state, isAuthenticated: true, user: action.payload, loading: false };
      case 'LOGIN_FAILURE':
      case 'SIGNUP_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'LOGOUT':
        return { ...state, isAuthenticated: false, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;