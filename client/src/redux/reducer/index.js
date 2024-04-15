import {
  GET_ACTIVITIES,
  GET_BY_NAME,
  GET_COUNTRIES,
  ORDER_ALP,
  ORDER_POPULATION,
} from "../actions";

const initialState = {
  allCountries: [],
  activitiesXCountries: [],
  filteredCountries: [],
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        allCountries: action.payload,
      };
    case ORDER_ALP:
      const nameOrder =
        action.payload === "asc"
          ? [...state.allCountries].sort((a, b) => a.name.localeCompare(b.name))
          : [...state.allCountries].sort((a, b) =>
              b.name.localeCompare(a.name)
            );
      return {
        ...state,
        allCountries: nameOrder,
      };

    case ORDER_POPULATION:
      const populationOrder =
        action.payload === "asc"
          ? [...state.allCountries].sort((a, b) => a.population - b.population)
          : [...state.allCountries].sort((a, b) => b.population - a.population);
      return {
        ...state,
        allCountries: populationOrder,
      };

    default:
      return state;
  }
};

export default rootReducer;
