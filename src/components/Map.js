import React from 'react'
import "../assets/Map.css"
import { MapContainer as LeafletMap, TileLayer} from 'react-leaflet';

function Map({ center, zoom }) {
  return (
    <div className='map'>
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LeafletMap>
    </div>
  );
}

export default Map