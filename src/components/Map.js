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

export function Map({data}) {
  let point;

  if(data.latitude && data.longitude) {
    point = [data.longitude, data.latitude]
  } else {
    point = [36.7050299,3.1713407]
  }

  return (
    <MapContainer center={point} zoom={25} scrollWheelZoom={false} style={{ height: '100%', width: "100%" }} >
      <ScaleControl />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={point}  >
        <Popup offset={new L.point(12,10)}>
          {JSON.stringify(point)}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
