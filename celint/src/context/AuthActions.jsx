export const LoginStart = (userC) => {
  {
    type: "LOGIN_START";
  }
};
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (id) => ({
  type: "FOLLOW",
  payload: id,
});
export const Unfollow = (id) => ({
  type: "UNFOLLOW",
  payload: id,
});
