import { init } from "@rematch/core";
import immerPlugin from "@rematch/immer";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import * as models from "./models";

const store = init({
  models,
  plugins: [
    immerPlugin(),
    persistPlugin({
      key: "expobot",
      storage
    })
  ],
});

export default store;
