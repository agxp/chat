export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      id: 1,
      username: "derp",
      discriminator: 1234
      //   access_token: "abcdderdafeg"
    }
  };
}
