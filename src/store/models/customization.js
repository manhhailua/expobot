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
      return {
        ...state,
        isOpen: [payload.id]
      };
    },
    toggleLeftDrawer(state, payload) {
      return {
        ...state,
        opened: payload.opened
      };
    },
    setFontFamily(state, payload) {
      return {
        ...state,
        fontFamily: payload.fontFamily
      };
    },
    setBorderRadius(state, payload) {
      return {
        ...state,
        borderRadius: payload.borderRadius
      };
    }
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
  })
};
