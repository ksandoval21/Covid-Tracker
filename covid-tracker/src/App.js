import './App.css';
import React, {useState, useEffect} from "react"
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core"

function App() {
  const [countries, setCountries]= useState([]);
  useEffect(() => {
    const getCountry= async ()=>{
      await fetch ("https:///disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name: country.country,
            value: country.countryInfo.iso2
          }));
        setCountries(countries)
      })
    }
    getCountry()
  }, [])
  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID TRACKER </h1>
        <FormControl className="app__dropdown">
          <Select 
          variant="outlined" 
          value="abc" >
            {
              countries.map(country=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;