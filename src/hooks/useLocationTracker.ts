import { useEffect, useState } from 'react';

interface IPositionOptions {
	maximumAge?: number;
	timeout?: number;
}

interface Coordinates {
	latitude: number;
	longitude: number;
}

export default function useLocationTracker(positionOptions?: IPositionOptions): {
	error: string;
	initialLocation: Coordinates;
	locations: Coordinates[];
} {
	const [initialLocation, setInitialLocation] = useState<Coordinates>({ latitude: 0, longitude: 0 });
	const [locations, setLocations] = useState<Coordinates[]>([]);
	const [error, setError] = useState('');

	function onError(err: GeolocationPositionError) {
		return setError(`ERROR(${err.code}): ${err.message}`);
	}

	useEffect(() => {
		(async () => {
			try {
				const permission = await navigator.permissions.query({ name: 'geolocation' });
				if (permission.state === 'granted' || permission.state === 'prompt') {
					const watchId = navigator.geolocation.watchPosition(
						(position: GeolocationPosition) => {
							const { latitude, longitude } = position.coords;
							if (locations.length === 0) {
								setInitialLocation({ latitude, longitude });
							}
							setLocations(prev => [...prev, { latitude, longitude }]);
						},
						onError,
						{
							...positionOptions,
							enableHighAccuracy: true,
						}
					);
					return () => navigator.geolocation.clearWatch(watchId);
				} else {
					setError('Location permission denied');
				}
			} catch (error) {
				setError(`Error while tracking location: ${error}`);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionOptions]);

	return { error, initialLocation, locations };
}
