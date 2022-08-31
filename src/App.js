import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card, 
  CardContent
} from '@material-ui/core'
import Table from './components/Table';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import { sortData } from './util.js';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";

function App() {

  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState("worldwide");
  const [ countryInfo, setCountryInfo ] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  const [ mapCenter, setMapCenter ] = useState([ 34.80746, -40.4796 ]);
  const [ mapZoom, setMapZoom ] = useState(3)
  const [ mapCountries, setMapCountries ] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();

  }, [])

  const onCountryChange = async( event ) => {
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 'https://disease.sh/v3/covid-19/countries/' + countryCode; 

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([ data.countryInfo.lat, data.countryInfo.long ]);
        setMapZoom(5);

      });
      // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      
  }

  return (
    <div className="app">
      <div className="app__left">
      {/* Title Container */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select 
              variant="outlined"
              value={ country }
              onChange={ onCountryChange }
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, index) => (
                  <MenuItem key={ index }value={ country.value }>{ country.name }</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Info Box */}
        <div className='app__stats'>
          <InfoBox title="Coronavirus Cases" cases={ countryInfo.todayCases } total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={ countryInfo.todayRecovered } total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={ countryInfo.todayDeaths } total={countryInfo.deaths} />
        </div>
        {/* Map Container */}
        <Map 
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          countries={mapCountries} 
        />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          {/* Graph */}
          <h3>Worldwide Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
    
  );
}

export default App;
