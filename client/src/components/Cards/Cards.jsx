import Card from "../Card/Card";
import './cards.css';

const Cards = ({allCountries}) => {

    const countriesList = allCountries

    return (
        <div className="card-list">
            {countriesList?.map((country) => (
                <Card country = {country} />
             ))}
        </div>
    )
}

export default Cards;