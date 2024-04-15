import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_BY_NAME = "GET_BY_NAME";
export const ORDER_ALP = "ORDER-ALP";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const GET_ACTIVITIES = "GET_ACTIVITIES";

export const getCountries = () => {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: response.data,
    });
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/activities");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: response.data,
    });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/countries/?name=${name}`
    );
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
};

export const orderAlp = (order) => {
  return { type: ORDER_ALP, payload: order };
};

export const orderPopulation = (order) => {
  return { type: ORDER_POPULATION, payload: order };
};
