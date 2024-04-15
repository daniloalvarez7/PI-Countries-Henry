import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivities,
  getCountries,
  orderAlp,
  orderPopulation,
} from "../../redux/actions";

import Cards from "../../components/Cards/Cards";
import "./home.css";
import SearchBar from "../../components/search/SearchBar";

const Home = () => {
  useEffect(() => {
    dispatch(getCountries()); // Cuando el componente se monta, se cargan las countries //
    dispatch(getActivities());
  }, []);

  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.allCountries); // Me "suscribo" al estado para que el componente esté enterado de los cambios del mismo //
  const pageSize = 10; // cards que se muestran por página //
  const activities = useSelector((state) => state.activities);
  // console.log(state);
  const [searchCountry, setSearchCountry] = useState(""); // Estado para la SearchBar //
  const [filtered, setFiltered] = useState(allCountries);
  const [currentPage, setCurrentPage] = useState(1); //estado local, pagina actual

  useEffect(() => {
    setFiltered(allCountries);
  }, [allCountries]);
  // PAGINACIÓN //

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }; //manejo cambio de pagina

  const startIndex = (currentPage - 1) * pageSize; //indice inicial para pagin
  const endIndex = Math.min(startIndex + pageSize, allCountries.length); //indice final para pagin

  const getCurrentPageNumber = () => {
    return currentPage;
  };

  // ORDENACIÓN //

  const handleClickOrderAlp = (e) => {
    e.preventDefault();
    dispatch(orderAlp(e.target.value));
  };

  const handleClickOrderPopulation = (e) => {
    e.preventDefault();
    dispatch(orderPopulation(e.target.value));
  };

  // FILTRADO //

  const handleClickFilterByContinent = (e) => {
    e.preventDefault();
    const filterByContinent = allCountries.filter(
      (country) => country.continent === e.target.value
    );
    setFiltered(filterByContinent);
  };

  const handleClickFilterByActivityList = () => {
    const AllActivities = allCountries.flatMap((country) => country.Activities);
    const uniqueActivities = [
      ...new Set(AllActivities.map((activity) => activity.name)),
    ];
    console.log("Lista de actividades:", uniqueActivities);
  };

  const handleClickFilterByActivity = (e) => {
    e.preventDefault();
    const activityName = e.target.value;

    // Filtrar los países que contienen la actividad seleccionada
    const filteredCountries = allCountries.filter((country) =>
      country.Activities.some((activity) => activity.name === activityName)
    );

    // Establecer los países filtrados como el nuevo estado
    setFiltered(filteredCountries);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const filtered = allCountries.filter((country) =>
      country.name.includes(searchCountry)
    );
    setFiltered(filtered);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchCountry(event.target.value);
  };

  return (
    <div className="home">
      {/* <p className="home-title">Estás en la Home Page</p> */}

      <div className="filters-container">
        <div>
          <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
        <div className="select-container">
          <label htmlFor="name">Name</label>
          <select
            className="home-select"
            id="name"
            onChange={(e) => {
              handleClickOrderAlp(e);
            }}
          >
            <option value="asc">a-z</option>
            <option value="des">z-a</option>
          </select>

          <label htmlFor="population">Population</label>
          <select
            className="home-select"
            id="population"
            onChange={(e) => {
              handleClickOrderPopulation(e);
            }}
          >
            <option value="asc">Min</option>
            <option value="des">Max</option>
          </select>

          <label htmlFor="continent">Continent</label>
          <select
            className="home-select"
            id="continent"
            onChange={(e) => {
              handleClickFilterByContinent(e);
            }}
          >
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
          </select>

          <label htmlFor="activities">Activities</label>
          <select
            className="home-select"
            id="activities"
            onClick={handleClickFilterByActivityList}
            onChange={(e) => {
              handleClickFilterByActivity(e);
            }}
          >
            {activities.map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Cards
        allCountries={
          filtered.length === 0
            ? allCountries.slice(startIndex, endIndex)
            : filtered.slice(startIndex, endIndex)
        }
      />

      <div className="pagination-container">
        <button
          className="home-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button className="home-button">{getCurrentPageNumber()}</button>
        <button
          className="home-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= allCountries.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
