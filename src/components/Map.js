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
