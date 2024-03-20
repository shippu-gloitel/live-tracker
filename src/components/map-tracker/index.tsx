// import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, LayerGroup } from 'react-leaflet';
import useLocationTracker from '../../hooks/useLocationTracker';

const startedLocationIcon = new Icon({
	iconUrl: '/pin-location.svg',
	iconSize: [30, 41], // Adjust size as needed
	iconAnchor: [12, 41], // Adjust anchor as needed
	popupAnchor: [-3, -76], // Adjust popup anchor as needed
});

const liveLocationIcon = new Icon({
	iconUrl: '/live-location.svg',
	iconSize: [30, 41], // Adjust size as needed
	iconAnchor: [12, 41], // Adjust anchor as needed
	popupAnchor: [-3, -76], // Adjust popup anchor as needed
});

const LiveTrackerLocationMap: React.FC = () => {
	const { error, initialLocation, locations } = useLocationTracker();

	return (
		<>
			{error && <div style={{ padding: '20px' }}>{error}</div>}

			{initialLocation.latitude !== 0 && initialLocation.longitude !== 0 && (
				<MapContainer
					center={[initialLocation.latitude, initialLocation.longitude]}
					zoom={13}
					zoomControl={true}
					scrollWheelZoom={true}
					markerZoomAnimation={true}
					style={{ height: '100vh', width: '100%', overflow: 'hidden' }}
					placeholder={<MapPlaceholder />}
				>
					<TileLayer
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>

					{/* start user location  */}
					<Marker position={[initialLocation.latitude, initialLocation.longitude]} icon={startedLocationIcon}>
						<Popup>You started location</Popup>
					</Marker>

					{/* moving user location  */}
					{locations.length > 0 && (
						<>
							<Polyline positions={locations.map(p => [p.latitude, p.longitude])} color='blue' />
							<LayerGroup>
								<Circle
									center={[locations[locations.length - 1].latitude, locations[locations.length - 1].longitude]}
									pathOptions={{ fillColor: 'green', fillOpacity: 0.4, stroke: true }}
									radius={200}
								>
									<Popup>
										This is a circle. <br /> Radius: 200 meters.
									</Popup>
								</Circle>
							</LayerGroup>
							<Marker
								position={[locations[locations.length - 1].latitude, locations[locations.length - 1].longitude]}
								icon={liveLocationIcon}
							>
								<Popup>You are here</Popup>
							</Marker>
						</>
					)}
				</MapContainer>
			)}
		</>
	);
};

function MapPlaceholder() {
	return (
		<p>
			Map of Raipur. <noscript>You need to enable JavaScript to see this map.</noscript>
		</p>
	);
}

export default LiveTrackerLocationMap;
