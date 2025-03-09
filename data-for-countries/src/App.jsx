import { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './components/Notification';
import TwoToTen from './components/TwoToTen';
import NoMatch from './components/NoMatch';
import OneMatch from './components/One';
import EachCountry from './components/EachCountry';
import ErrorNotification from './components/ErrorNotification';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [beginSearch, setBeginSearch] = useState(null);
  const [countriesList, setCountriesList] = useState(null);
  const [overTenMessage, setOverTenMessage] = useState(null);
  const [oneMatch, setOneMatch] = useState(null);
  const [noMatchMsg, setNoMatchMsg] = useState(null);
  const [eachCountry, setEachCountry] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
   
  
    useEffect(() => {
      
      if(countries) {   
        
        axios
         .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
         .then(response => {
            const countryList = response.data.filter(d => d.name.common.toLowerCase().includes(countries.toLowerCase()))
            
            setCountriesList(countryList);
            countryDataShowing(countryList);
        })
        .catch(error => {
          setErrorMsg('Data has failed to load. Please try again later.');
        })
      } 
    }, [countries]);

    
  const handleChange = (event) => {
   if (!event.target.value) {
      setBeginSearch('Please type country name to begin searching.');
      setCountriesList(null);
      setNoMatchMsg(null);
      setOverTenMessage(null);
      setOneMatch(null);
      setCountries(null);
      setEachCountry(null);
   } else {
      setCountries(event.target.value);
    }    
  };

  const countryDataShowing = (arr) => {

    const length = arr.length;

    if (length > 10) {
      setOverTenMessage('Too many matches. Please specify another filter.');
      setNoMatchMsg(null);
      setCountriesList(null);
      setBeginSearch(null);
      setOneMatch(null);
      setEachCountry(null);
      return;
      
    } else if (length > 1 && length <= 10) {
      setCountriesList(arr);
      setNoMatchMsg(null);
      setOverTenMessage(null);
      setBeginSearch(null);
      setOneMatch(null);
      setEachCountry(null);
      return;

    } else if (length === 1) {
      setOneMatch(arr);
      setNoMatchMsg(null);
      setOverTenMessage(null);
      setCountriesList(null);
      setBeginSearch(null);
      setEachCountry(null);
      return;

    } else {
      setNoMatchMsg('No countries found. Please try another search.');
      setOverTenMessage(null);
      setCountriesList(null);
      setBeginSearch(null);
      setOneMatch(null);
      setEachCountry(null);
      return;
    }
  };

  const handleShowCountryDetail = (countryCommonName) => {
    const countryToShow = countriesList.find(country => country.name.common === countryCommonName);    
    setEachCountry(countryToShow);
    setCountriesList(null);
    setCountries(null);

  };

  return (
    <div>
      <p>find countries <input onChange={handleChange}/></p>
      <ErrorNotification message={errorMsg} />
      <Notification message={beginSearch} />
      <NoMatch message={noMatchMsg} />
      <Notification message={overTenMessage} />
      <TwoToTen array={countriesList} onClick={handleShowCountryDetail} />
      <EachCountry array={eachCountry} />
      <OneMatch array={oneMatch} />
      
    </div>
  )

};

export default App
