import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { localStorage } from "redux-persist/storages";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./reducers";

export default function configureStore() {
  const middleware = applyMiddleware(promise(), thunk, createLogger());
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(reducer, compose(autoRehydrate(), middleware));

      persistStore(store, { storage: localStorage }, () => resolve(store));
    } catch (e) {
      reject(e);
    }
  });
}
