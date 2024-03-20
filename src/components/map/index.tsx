'use client';
// import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Icon } from 'leaflet';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import useLivePosition from '../../hooks/useLivePosition';

// https://nominatim.openstreetmap.org/reverse?lat=21.2093149&lon=81.6582886&format=json

{
	/* <link
	rel='stylesheet'
	href='https://unpkg.com/leaflet@1.9.3/dist/leaflet.css'
	integrity='sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI='
	crossorigin=''
/>; */
}

const mapStyles: React.CSSProperties = {
	overflow: 'hidden',
	width: '100%',
	height: '100vh',
};

const customIcon = new Icon({
	iconUrl: '/pin-location.svg',
	iconSize: [30, 41], // Adjust size as needed
	iconAnchor: [12, 41], // Adjust anchor as needed
	popupAnchor: [-3, -76], // Adjust popup anchor as needed
});

const LiveLocationMap: React.FC = () => {
	const { error, position } = useLivePosition();

	return (
		<>
			{error && <div style={{ padding: '20px' }}>{error}</div>}

			{position.latitude !== 0 && position.longitude !== 0 && (
				<MapContainer
					center={[position.latitude, position.longitude]} // default position
					zoom={13}
					zoomControl={true}
					scrollWheelZoom={true}
					markerZoomAnimation={true}
					style={mapStyles}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>

					<Circle
						center={[position.latitude, position.longitude]}
						radius={500}
						color='blue'
						fillColor='green'
						fillOpacity={0.4}
					>
						<Popup>
							This is a circle. <br /> Radius: 500 meters.
						</Popup>
					</Circle>
					<Marker position={[position.latitude, position.longitude]} icon={customIcon}>
						<Popup>
							Acctual Location. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			)}
		</>
	);
};

export default LiveLocationMap;
