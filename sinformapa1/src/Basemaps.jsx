import React from 'react';

class Basemap extends React.Component {
  onChange = (e) => {
    var bm = e.currentTarget.value;

    if (this.props.onChange) {
      this.props.onChange(bm);
    }
  }

  render() {
    return (
      <div className="basemaps-container">
        <select value={this.props.basemap} onChange={this.onChange}>
          <option value="osm">Open Street Map</option>
          <option value="real">Mapa 3D</option>
          <option value="dark">Mapa Dark</option>
        </select>
      </div>
    );
  }
};

export default Basemap;