import WeatherData from './Weather';

const EachCountry = (props) => {
    
    if (props.array === null) {
        return null;
    }

    const header = props.array.capital;
    
    return (
        <div>
            <h1>{props.array.name.common}</h1>
            <p><strong>Capital </strong>{props.array.capital}</p>
            <p><strong>Area </strong>{props.array.area}</p>
            <h2>Languages</h2>
            {Object.values(props.array.languages).map(language => <li key={language}>{language}</li>)}
            <h2>Flag</h2>     
            <img src={props.array.flags.png} />   
            <WeatherData header={header} latlng={props.array.latlng}    />

        </div>
    )

};

export default EachCountry;