// import './form.css';

// const Form = () => {
//     return (
//         <div>
//             <p>Form de creación de Activities</p>
//         </div>
//     )
// }

// export default Form;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './Form.css';
import { Link, Navigate} from 'react-router-dom'
import axios from "axios";
import { getCountries } from "../../redux/actions/index.js";
import Navbar from "../../components/navbar/Navbar.component.jsx";
import validate from "../../components/Validate/validate.js";

const Form = () => {
  
  const allCountries = useSelector(state => state.allCountries);
  const [selectedCountries, setSelectedCountries] = useState([]); // Estado para almacenar los países seleccionados

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "", 
    duration: "",
    season: "",   
  });
  const [errors, setErrors] = useState({
    name: "",
    difficulty: "", 
    duration: "",
    season: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries()); // Carga todos los países cuando el componente se monta
  }, [dispatch]);

  const createActivity = async () => {
    try {
      const response = await axios.post('http://localhost:3001/activities', { ...activity, countryIDs: selectedCountries });
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Manejar el cambio en la lista desplegable de países
    if (name === 'country') {
      const countryIDs = value;
      if (!selectedCountries.includes(countryIDs)) {     // siempre que al país no haya ya sido seleccionado
        setSelectedCountries([...selectedCountries, countryIDs]); // agrego el id del país seleccionado al estado
      }
    } else {
      setActivity({ ...activity, [name]: value });
    }
    // Validar el formulario y actualizar los errores
    const newErrors = validate({ ...activity, [name]: value });
    setErrors(newErrors);
  };

  const handleRemoveCountry = (countryIDs) => {
    setSelectedCountries(selectedCountries.filter(id => id !== countryId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateError = validate(activity);
    if (!hasErrors(validateError)) {
      try {
        // Crear la actividad enviando los detalles al servidor
        await createActivity();
        alert("Actividad creada exitosamente");
      } catch (error) {
        alert("Ocurrió un error al crear la actividad: " + error.message);
      }
    } else {
      // Actualizar el estado errors con los mensajes de error de validación
      setErrors(validateError);
    }
  };

  const hasErrors = (validateError) => {
    const errorsExist = Object.values(validateError).some(error => error !== '') || activity.name === '' || activity.difficulty === '' || activity.duration === '' || activity.season === '' || selectedCountries.length === 0;
    return errorsExist;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Países:</span>
          <select name="country" onChange={handleChange} value="">
            <option value="" disabled>Selecciona un país</option>
            {allCountries.map(country => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
        </label>
        <div>
          {selectedCountries.map(countryId => (
            <span key={countryId} className="selected-country">
              {allCountries.find(country => country.id === countryId)?.name}
              <button type="button" onClick={() => handleRemoveCountry(countryId)}>X</button>
            </span> 
          ))}

        </div>
        <label>
          <span>Nombre:</span>
          <input type='text' name='name' value={activity.name} onChange={handleChange} />
        </label>
        {(errors && errors.name && errors.name !== '') ? <p>{errors.name}</p> : null}
     
        <label>
          <span>Dificultad:</span>
          <input name='difficulty' value={activity.difficulty} onChange={handleChange} />
        </label>
        {(errors && errors.difficulty && errors.difficulty !== '') ? (<p>{errors.difficulty}</p>) : null}
     
        <label>
          <span>Duración:</span>
          <input type='text' name='duration' value={activity.duration} onChange={handleChange} />
        </label>
        {(errors && errors.duration && errors.duration !== '') ? <p>{errors.duration}</p> : null}
     
        <label>
          <span>Temporada:</span>
          <input type='text' name='season' value={activity.season} onChange={handleChange} />
        </label>
        {(errors && errors.season && errors.season !== '') ? <p>{errors.season}</p> : null}
     
        <button type='submit' disabled={hasErrors(errors)}>Crear actividad</button>
      </form>
    </>
  );
};

export default Form;