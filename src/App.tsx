import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import LiveLocationMap from './components/map';
import LiveTrackerLocationMap from './components/map-tracker';

function App() {
	const [button1, setButton1] = useState(false);
	const [button2, setButton2] = useState(true);

	function b1Click() {
		setButton1(prev => !prev);
		setButton2(false);
	}

	function b2Click() {
		setButton1(false);
		setButton2(prev => !prev);
	}

	const handleRefresh = () => {
		setButton2(true);
		window.location.reload();
	};

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
				<div>
					<button
						type='button'
						onClick={b1Click}
						style={{
							cursor: 'pointer',
							margin: '20px',
							padding: '5px',
							borderRadius: '10px',
							background: button1 ? 'cyan' : 'white',
						}}
					>
						Live Tracker
					</button>
					<button
						type='button'
						onClick={b2Click}
						style={{
							cursor: 'pointer',
							margin: '20px',
							padding: '5px',
							borderRadius: '10px',
							background: button2 ? 'cyan' : 'white',
						}}
					>
						Live Location
					</button>

					{button2 && (
						<button type='button' onClick={handleRefresh} style={{ marginLeft: '20px' }}>
							Refresh
						</button>
					)}
				</div>

				<span style={{ fontSize: '18px', color: 'orange' }}>
					Map : where you can check user live location or track user location
				</span>
			</div>

			{/* map */}
			{button1 && <LiveTrackerLocationMap />}
			{button2 && <LiveLocationMap />}
		</>
	);
}

export default App;
