import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Basemap from './Basemaps';
import GeojsonLayer from './GeojsonLayerFunc';
import './Map.css';

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class MapComponent extends React.Component {
  state = {
    lat: -5.091007,
    lng: -42.798611,
    zoom: 12,
    basemap: 'osm',

    geojsonvisible: false,
  };

  onBMChange = (bm) => {
    this.setState({
      basemap: bm
    });
  }

  onGeojsonToggle = (e) => {
    
    this.setState({
      geojsonvisible: e.currentTarget.checked
    });
  }

  render() {
    var center = [this.state.lat, this.state.lng];

    const basemapsDict = {
      osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      real: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      dark:"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  }

    return (
      <Map zoom={this.state.zoom} center={center}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={basemapsDict[this.state.basemap]}
        />
        <Basemap basemap={this.state.basemap} onChange={this.onBMChange} />

        <div className="geojson-toggle">
          <label htmlFor="layertoggle">Toggle Geojson </label>
          <input type="checkbox"
            name="layertoggle" id="layertoggle"
            value={this.state.geojsonvisible} onChange={this.onGeojsonToggle} />
        </div>
        
        {this.state.geojsonvisible && 
          <GeojsonLayer url="places.json" cluster={true}/>
        }

        <Marker position={center}>
          <Popup>
            <b>Secretaria de Segurança</b> <p>Centro</p>
          </Popup>
        </Marker>
      </Map>
    );
  }
};

export default MapComponent;