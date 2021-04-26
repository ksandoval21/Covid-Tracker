import "./App.css";
import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  useEffect(() => {
    const getCountry = async () => {
      await fetch("https:///disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountry();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);
    const url = countryCode === "worldwide"
  };

  return (
    <div className="app">
      <div className="app__left">
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
        <div className="app__stats">
          <InfoBox title="Cases" cases={123} total={2000} />

          <InfoBox title="Recovered" cases={13} total={2000} />

          <InfoBox title="Deaths" cases={3} total={2000} />
        </div>
        <Map />
      </div>
      <Card className="app__left">
        <CardContent>
          <h3>Live Cases by Country </h3>
          <h3>World Wide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
