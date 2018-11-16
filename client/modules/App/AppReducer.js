// Import Actions
import { TOGGLE_ADD_MOVIE } from './AppActions';

// Initial State
const initialState = {
  showAddMovie: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_MOVIE:
      return {
        showAddMovie: !state.showAddMovie,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddMovie
export const getShowAddMovie = state => state.app.showAddMovie;

// Export Reducer
export default AppReducer;
