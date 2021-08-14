const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFeching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFeching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFeching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
