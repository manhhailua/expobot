import { sortBy } from "lodash";
import { openAI } from "utils/axios";

export default {
  state: {
    list: []
  },
  reducers: {
    setList(state, payload) {
      state.list = sortBy(payload, "created_at").reverse();
    }
  },
  effects: (dispatch) => ({
    async getList() {
      const list = await openAI.get("/files");
      dispatch.files.setList(list.data?.data);
    }
  })
};
