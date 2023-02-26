import axios from "axios";

export const ALL_RECIPES = "ALL_RECIPES";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const ALL_DIETS = "ALL_DIETS";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const ALL_ORDERING = "ALL_ORDERING";
export const POST_RECIPE = "POST_RECIPE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_RECIPE_DETAIL = "CLEAR_RECIPE_DETAIL";


export const getRecipes = () => async (dispatch) => {
  const recipesAll = await axios.get("http://localhost:3001/recipes");
  const response = recipesAll.data;
  dispatch({
    type: ALL_RECIPES,
    payload: response,
  });
};

export const getSearchRecipe = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/recipe?name=${name}`);
    dispatch({
      type: SEARCH_RECIPE,
      payload: response.data,
    });
  } catch (error) {
   dispatch({
      type: SEARCH_RECIPE,
      payload: ["Recipe not found"],
    });
  }
  
};

export const getDiets = () => async (dispatch) => {
  const responseDiets = await axios.get("http://localhost:3001/diets");
  dispatch({
    type: ALL_DIETS,
    payload: responseDiets.data,
  });
};

export const filterDiets = (payload) => (dispatch) => {
  dispatch({
    type: FILTER_DIETS,
    payload: payload,
  });
};

export const filter = (payload) => (dispatch) => {
  dispatch({
    type: FILTER_RECIPES,
    payload: payload,
  });
};

export const allOrdering = (payload) => (dispatch) => {
  dispatch({
    type: ALL_ORDERING,
    payload: payload,
  });
};

export const postRecipe = (create) => async (dispatch) => {
  const response = await axios.post("http://localhost:3001/recipes", create);
  dispatch({
    type: POST_RECIPE,
    payload: response.data,
  });
};

export const getRecipeDetail = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:3001/recipes/${id}`);
  dispatch({
    type: GET_RECIPE_DETAIL,
    payload: response.data,
  });
};

export const clearRecipeDetail = () => (dispatch) => {
  dispatch({
    type: CLEAR_RECIPE_DETAIL,
    payload: {},
  });
};
