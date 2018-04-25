const defaultState = {
  user: null,
  searching: false,
  song: null,
}



export default function rootReducer(state = defaultState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
