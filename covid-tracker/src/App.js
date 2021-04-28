import "./App.css";
import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table"
import {sortData} from "./util"
import LineGraph from "./LineGraph"
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]= useState({})
  const [tableData, setTableData]=  useState([])
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [zoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [isLoading, setLoading] = useState(false);
// Loads when page loads with placeholder information
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data)
    })
  }, [])
// Fetched the countries for the dropdown menu
  useEffect(() => {
    const getCountry = async () => {
      await fetch("https:///disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            population: country.country.population,
            
          }));
          const sortedData= sortData(data)
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountry();
  }, []);

// Once item is selected it fetches the information and loads the cards
  const onCountryChange = async (event) => {
    setLoading(true)
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response=> response.json())
    .then(data=> {
      setCountry(countryCode);
      setCountryInfo(data)
      setLoading(false);
      console.log(countryInfo)
        // console.log([data.countryInfo.lat, data.countryInfo.long]);
        countryCode === "worldwide"
          ? setMapCenter([41.257017, 29.077524])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(5);
      });
  };

  return (
    <div className="app">
      <div className="app__right">
        <div className="app__header">
          <h1>COVID TRACKER </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <h2 className="today">Total Population: {countryInfo.population}</h2>
        <div className="app__stats">
          <InfoBox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <h2>Cases Map</h2>
        <Map 
          countries={mapCountries}
          center={mapCenter}
          zoom={zoom}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Cases by Day</h3>
          <LineGraph />
          <h3>Sorted Cases</h3>
          <Table countries={tableData}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
