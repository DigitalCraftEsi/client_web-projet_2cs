<<<<<<< HEAD
import { MapContainer, TileLayer, Popup, Marker, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export function Map() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: "100%" }} >
      <ScaleControl />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}  >
        <Popup offset={new L.point(12,10)}>
          A pretty CSS3 popup Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
=======
import React from "react";
import GoogleMapReact from "google-map-react";

function Map(props) {
	const { center, zoom } = props;

	return (
		<div style={{ height: "400px", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "YOUR_API_KEY_HERE" }}
				defaultCenter={center}
				defaultZoom={zoom}
			/>
		</div>
	);
}

Map.defaultProps = {
	center: { lat: 37.7749, lng: -122.4194 },
	zoom: 10,
};

export default Map;
>>>>>>> lamine/AccountInfo
