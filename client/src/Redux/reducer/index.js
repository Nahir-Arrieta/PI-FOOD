import {
  ALL_RECIPES,
  SEARCH_RECIPE,
  ALL_DIETS,
  FILTER_DIETS,
  FILTER_RECIPES,
  ALL_ORDERING,
  POST_RECIPE,
  GET_RECIPE_DETAIL,
  CLEAR_RECIPE_DETAIL,
} from "../actions";

const initialState = {
  recipes: [],
  recipeCopy: [],
  diets: [],
  recipeCreate: [],
  recipeDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipeCopy: action.payload,
      };
    case SEARCH_RECIPE:
      console.log(action.payload);
      return {
        ...state,
        recipes: action.payload,
      };
    case ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_DIETS:
      return {
        ...state,
        recipes: state.recipeCopy.filter(
          (element) =>
            element.diets.includes(action.payload) ||
            element.diets.map((diet) => diet.name).includes(action.payload)
        ),
      };
    case FILTER_RECIPES:
      if (action.payload === "Recipes Created") {
        return {
          ...state,
          recipes: state.recipeCopy.filter((element) =>
            element.created ? element : null
          ),
        };
      }
      if (action.payload === "Recipes Api") {
        return {
          ...state,
          recipes: state.recipeCopy.filter((element) =>
            element.created ? null : element
          ),
        };
      }
      break;
    case ALL_ORDERING:
      if (action.payload === "A-Z") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "Z-A") {
        return {
          ...state,
          recipes: state.recipes.sort((b, a) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "health score -") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) {
              return -1;
            }
            if (a.healthScore > b.healthScore) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "health score +") {
        return {
          ...state,
          recipes: state.recipes.sort((b, a) => {
            if (a.healthScore < b.healthScore) {
              return -1;
            }
            if (a.healthScore > b.healthScore) {
              return 1;
            }
            return 0;
          }),
        };
      }
      break;
    case POST_RECIPE:
      return {
        ...state,
        recipeCreate: action.payload,
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case CLEAR_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: [],
      };
    default:
      return state;
  }
};

export default rootReducer;
