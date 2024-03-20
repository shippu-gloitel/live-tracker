import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import LiveLocationMap from './components/map';
import LiveTrackerLocationMap from './components/map-tracker';

function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
				<div>
					<button
						type='button'
						onClick={() => setIsOpen(!isOpen)}
						style={{ cursor: 'pointer', margin: '20px', padding: '5px', borderRadius: '10px' }}
					>
						map
					</button>
					<span>{isOpen ? 'Live Tracker' : 'Live Location'}</span>
				</div>

				<span style={{ fontSize: '18px', color: 'orange' }}>
					Map : where you can check user live location or track user location
				</span>
			</div>

			{/* map */}
			{isOpen ? <LiveTrackerLocationMap /> : <LiveLocationMap />}
		</>
	);
}

export default App;
