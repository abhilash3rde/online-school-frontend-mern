import "./Global";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { save, load } from "redux-localstorage-simple";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import * as serviceWorker from "./serviceWorker";

const createStoreWithMiddleware = applyMiddleware(
  save() // Saving done here
)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  load() // Loading done here
);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
