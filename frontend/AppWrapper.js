import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import App from "./App.js";
import store from "./redux/store.js";

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default registerRootComponent(AppWrapper);
