export default {
  state: {
    firebaseProfile: null,
    openAI: {
      apiKey: ""
    }
  },
  reducers: {
    setFirebaseProfile(state, payload) {
      state.firebaseProfile = payload;
    },
    setOpenAIAPIKey(state, payload) {
      state.openAI.apiKey = payload;
    }
  },
  effects: (dispatch) => ({})
};
