export default function reducer(
  state = {
    channel: {
      id: null,
      name: null,
      members: null
    },
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_CHANNEL": {
      return { ...state, fetching: true };
    }
    case "FETCH_CHANNEL_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_CHANNEL_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        channel: action.payload
      };
    }
  }

  return state;
}
