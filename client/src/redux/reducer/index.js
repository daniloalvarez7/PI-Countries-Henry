import {
  GET_ACTIVITIES,
  GET_BY_NAME,
  GET_COUNTRIES,
  GET_COUNTRIES_X_CONTINENT,
  GET_COUNTRIES_x_ACTIVITY,
  ORDER_ALP,
  ORDER_POPULATION,
} from "../actions";

const initialState = {
  allCountries: [],
  countriesCopy: [],
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
        countriesCopy: action.payload,
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
    case GET_COUNTRIES_X_CONTINENT:
      if (action.payload === "All") {
        return {
          ...state,
          allCountries: countriesCopy,
        };
      } else {
        const filteredContinent = state.countriesCopy.filter(
          (char) => char.continent === action.payload
        );
        return {
          ...state,
          allCountries: filteredContinent,
        };
      }

    case GET_COUNTRIES_x_ACTIVITY:
      const filterAct = state.countriesCopy.filter((country) =>
        country.Activities?.map((item) => item.name).includes(action.payload)
      );
      return {
        ...state,
        allCountries: filterAct,
      };

    default:
      return state;
  }
};

export default rootReducer;
