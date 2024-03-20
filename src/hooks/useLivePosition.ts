import { useEffect, useState } from 'react';

interface IPositionOptions {
	maximumAge?: number;
	timeout?: number;
}

interface Coordinates {
	latitude: number;
	longitude: number;
}

export default function useLivePosition(positionOptions?: IPositionOptions): {
	position: Coordinates;
	error: string;
} {
	const [position, setPosition] = useState<Coordinates>({ latitude: 0, longitude: 0 });
	const [error, setError] = useState('');

	function onSuccess(position: GeolocationPosition) {
		const { latitude, longitude } = position.coords;
		setPosition({ latitude, longitude });
	}

	function onError(err: GeolocationPositionError) {
		return setError(`ERROR(${err.code}): ${err.message}`);
	}

	useEffect(() => {
		(async () => {
			try {
				const permission = await navigator.permissions.query({ name: 'geolocation' });
				if (permission.state === 'granted' || permission.state === 'prompt') {
					navigator.geolocation.getCurrentPosition(onSuccess, onError, {
						...positionOptions,
						enableHighAccuracy: true,
					});
				} else {
					setError('Location permission denied.');
				}
			} catch (error) {
				setError(`Error while tracking location: ${error}`);
			}
		})();
	}, [positionOptions]);

	return { error, position };
}
