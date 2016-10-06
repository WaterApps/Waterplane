import React, { Proptypes } from 'react';
import { connect } from 'cerebral-view-react';
import { Map, TileLayer} from 'react-leaflet';
import styles from './map.css';
import uuid from 'uuid';
import RasterLayer from '../RasterLayer';
import Legend from '../Legend';
import fastyles from '../css/font-awesome.min.css';
import FontAwesome from 'react-fontawesome';

export default connect(props => ({
  legend: 'app.view.legends.elevation',
  dataIndex: 'app.model.data_index',
}), {
},

  class WaterplaneMap extends React.Component {

    render() {
      var self = this;
      var position = [40.853989, -86.142021]; 
      
      var legends = [];
      if (self.props.token) {
        legends.push(<Legend 
          position={'bottomright'} 
          key={uuid.v4()}
         />);
      } else {
        legends = null;
      }
      var rasterLayers = [];
      Object.keys(this.props.dataIndex).forEach(function(layer) {
        rasterLayers.push(
          <RasterLayer
            key={'RasterLayer-elevation'}
            async={true}
            geohashGridlines={false}
            tileGridlines={false}
          />
        )
      })
      return (
        <div id='map-panel'>
          <Map 
            dragging={true}
            center={position} 
            ref='map'
            zoom={15}>
  
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
            {rasterLayers}
            {legends}
  
          </Map> 
        </div>
      );
    }
  }
)
