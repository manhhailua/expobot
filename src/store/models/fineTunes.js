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
    async list() {
      const list = await openAI.get("/fine-tunes");
      dispatch.fineTunes.setList(list.data?.data);
    },
    async retrieve(id) {
      return await openAI.get(`/fine-tunes/${id}`);
    },
    async listEvents(id) {
      return await openAI.get(`/fine-tunes/${id}/events`);
    },
    async cancel(id) {
      return await openAI.post(`/fine-tunes/${id}/cancel`);
    }
  })
};
