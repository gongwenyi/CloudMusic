import React from 'react';

export const AppContext = React.createContext();

export const initial = {
  playlist: [],
  playlistIds: [],
  currentIndex: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'ADD_PLAY_LIST': return {  ...state, playlist: payload.playlist, playlistIds: payload.playlistIds, currentIndex: payload.currentIndex }
    case 'PLAY_NEXT': return {  ...state, currentIndex: payload.currentIndex }
    case 'PLAY_PREV': return {  ...state, currentIndex: payload.currentIndex }
    default: return {...state};
  }
}

export default reducer;