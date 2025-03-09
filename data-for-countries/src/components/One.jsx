import WeatherData from './Weather';

const OneMatch = (props) => {
    
    if (props.array === null) {
        return null;
    }
    
    const lati= props.array.map(a => a.latlng[0]);
    const longi = props.array.map(a => a.latlng[1]);
    const data = [];
    data.push(...lati);
    data.push(...longi);

    const header = props.array.map(a => a.capital);
    
    return (
        <div>
            <h1>{props.array.map(a => a.name.common)}</h1>
            <p><strong>Capital </strong>{props.array.map(a => a.capital)}</p>
            <p><strong>Area </strong>{props.array.map(a => a.area)}</p>
            <h2>Languages</h2>
            {props.array.map(a => Object.values(a.languages).map(language => <li key={language}>{language}</li>)
           )}
             <img src={props.array.map(a => a.flags.png)} />
             <WeatherData header={header} latlng={data} />      

        </div>
    )

};

export default OneMatch;