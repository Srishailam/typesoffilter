import { useState,  useEffect, useRef} from 'react';
import './App.css';

const Country = ({name, flag, onClick}) => (
  <div className="Country" onClick={onClick}>
    <div className="Country_Name">{name}</div>
    <img src={flag} width="200" height="200"/>
  </div>
)

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [userValue, setUserValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([])

  const userInputRef = useRef(null);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://restcountries.eu/rest/v2/all')
    .then( response => response.json())
    .then(data => {
      console.log(
        data
      )
      setCountries(data);
      setIsLoading(false);
      userInputRef.current.focus();
    })
    .catch( e => console.log(
      e
    ))
  }, []);

  useEffect(() => {
    setFilteredCountries(countries.filter(item => item.name.toLowerCase().indexOf(userValue.toLowerCase()) > -1 ));
  }, [userValue, countries])
  // let filterData = countries.filter(item => item.name.toLowerCase().indexOf(userValue.toLowerCase()) > -1 );

  const handleUserInput = (e) => {
    setUserValue(e.target.value);
  }
  const handleSelectedCountry = (code) => {
    const selectedCountry = filteredCountries.find(item => item.alpha3Code === code);
    setSelectedCountries( prev => ([...prev, selectedCountry]))
  }

  if(isLoading){
    return <span>Loading All the countries...</span>
  }
  return (
      <div className="App">
        <h1>Countries</h1>
        <input type="text" value={userValue} onChange={handleUserInput} ref={userInputRef}/>
        <div className="Container">
          <div className="Countries">
            {
              filteredCountries.map( eachCountry => <Country key={eachCountry.alpha3Code} {...eachCountry} onClick={() => handleSelectedCountry(eachCountry.alpha3Code)}/>)
            }
          </div>
          <div className="Selected_Countries">
            { selectedCountries.map( eachSelectedCountry => <Country key={eachSelectedCountry.alpha3Code} {...eachSelectedCountry} />) }
          </div>
        </div>
      </div>
    );
}

export default App;
