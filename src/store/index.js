import { init } from "@rematch/core";
import immerPlugin from "@rematch/immer";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import * as models from "./models";

const persistConfig = {
  key: "expobot",
  storage
};

const store = init({
  models,
  plugins: [
    immerPlugin(),
    persistPlugin(persistConfig)
  ]
});

export default store;
