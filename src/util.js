import React from "react"
import numeral from "numeral"
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors ={
    cases: {
        hex: "#CC1034",
        multiplier: 100,
    }, 
    recovered: {
        hex: "#7DD71D",
        multiplier: 300,
    }, 
    deaths: {
        hex: "#FB4443",
        multiplier: 600,
    }
}

export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort(( a, b ) => (a.cases > b.cases ? -1 : 1));
    
}

// Draw circles on the map
export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div class="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div class="info-name">{country.country}</div>
                    <div class="info-cases">Cases: <span>{ numeral(country.cases).format("0.0")}</span></div>
                    <div class="info-recovered">Recovered: <span>{ numeral(country.recovered).format("0.0")}</span></div>
                    <div class="info-deaths">Deaths: <span>{ numeral(country.deaths).format("0.0")}</span></div>
                </div>
            </Popup>
        </Circle>
    ))
)