/* eslint camelcase: 0 */

export function tokenConfig(token) {
  return {
    headers: {
      Authorization: "Bearer " + token // eslint-disable-line quote-props
    }
  };
}

export function validate_token(token) {
  return fetch.post("/api/is_token_valid", {
    token
  });
}

export function create_user(username, email, password) {
  if (email === "trial")
    return fetch("/api/trial", {
      method: "POST",
      body: JSON.stringify({ username })
    });
  return fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
}

export function get_token(email, password) {
  return fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });
}

export function data_about_user(token) {
  return fetch("/api/user/@me", tokenConfig(token));
}

export function create_channel(token, name, topic) {
  return fetch("/api/channels", {
    method: "POST",
    headers: "Authorization: Bearer " + token,
    body: JSON.stringify({ name, topic })
  });
}

export function join_channel(token, id) {
  return fetch("/api/channels/" + id + "/members", {
    method: "PUT",
    headers: "Authorization: Bearer " + token
  });
}

export function get_channel(id) {
  //  return async (dispatch, getState) => {
  //   try {
  //     const { auth: { token } } = getState();
  //     const headers = tokenConfig(token);
  //     const channel = (await fetch("/api/users/@me/channels/" + id, {
  //       headers
  //     }));
  //     dispatch({ type: FETCH_POST_SUCCESS, post });
  //   } catch (error) {
  //     dispatch({
  //       type: FETCH_POST_FAILURE,
  //       error: Error('Unknown error occured :-(. Please, try again later.')
  //     });
  //   }
  // };
}
