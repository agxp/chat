/* eslint camelcase: 0 */

const tokenConfig = token => ({
  headers: {
    Authorization: "Bearer " + token // eslint-disable-line quote-props
  }
});

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
