import React from 'react'
import "../assets/Map.css"
import { MapContainer as LeafletMap, TileLayer} from 'react-leaflet';
import { showDataOnMap } from '../util';

function Map({countries, mapCenter, mapZoom }) {
  return (
    <div className='map'>
        <LeafletMap center={mapCenter} zoom={mapZoom}>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Loop Through the countries */}
            {showDataOnMap(countries)}
        </LeafletMap>
    </div>
  );
}

export default Map