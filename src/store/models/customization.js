import config from "config";

export default {
  state: {
    isOpen: [config.defaultId], // for active default menu
    defaultId: config.defaultId,
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
  },
  reducers: {
    setActiveId(state, payload) {
      state.isOpen = [payload.id];
    },
    toggleLeftDrawer(state, payload) {
      state.opened = payload.opened;
    },
    setFontFamily(state, payload) {
      state.fontFamily = payload.fontFamily;
    },
    setBorderRadius(state, payload) {
      state.borderRadius = payload.borderRadius;
    }
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
  })
};
