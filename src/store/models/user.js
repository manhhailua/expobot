export default {
  state: {
    firebaseProfile: null
  },
  reducers: {
    setFirebaseProfile(state, payload) {
      return {
        ...state,
        firebaseProfile: payload
      };
    }
  },
  effects: (dispatch) => ({})
};
