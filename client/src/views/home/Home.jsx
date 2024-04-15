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

  const handleClickFilterByActivity = (e) => {
    e.preventDefault();
    //Buscar las actividades de la temporada elegidas
    const filteredActivities = activities.filter(
      (activity) => activity.season === e.target.value
    );
    //De esas actividades, listar los paises que correspondan a cada una
    const countryForActivity =
      // Del listado de allcountries, filtrar solo aquellos que estaban incluidos en las actividades
      //Devolver esos countries
      setFiltered(filterByContinent);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const countryExists = allCountries.find(country => country.name.toLowerCase() === searchCountry.toLowerCase());
    // if (countryExists) {
    //     navigate(`/detail/${countryExists.id}`);
    // } else {
    //     alert('El país ingresado no existe en la base de datos.');
    // }
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
      <p className="home-title">Estás en la Home Page</p>

      <div>
        <div>
          <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
        <section>
          <label htmlFor="name">Name</label>
          <select
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
            id="population"
            onChange={(e) => {
              handleClickOrderPopulation(e);
            }}
          >
            <option value="asc">Min </option>
            <option value="des">Max</option>
          </select>
        </section>
      </div>

      <div>
        <section>
          <label htmlFor="continent">Continent</label>
          <select
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
            id="activities"
            onChange={(e) => {
              handleClickFilterByActivity(e);
            }}
          >
            <option value="Verano">Verano </option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </section>
      </div>

      <Cards
        allCountries={
          filtered.length === 0
            ? allCountries.slice(startIndex, endIndex)
            : filtered.slice(startIndex, endIndex)
        }
      />

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button>{getCurrentPageNumber()}</button>
        <button
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
