import React, {useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

interface MapComponentProps {
    onMapClick: (markers: { lat: number, lng: number }[], distance: number | null) => void;
}


const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 9.727761844379808,
    lng: 79.99733154656138
};


const toRadians = (degrees: any) => {
    return degrees * (Math.PI / 180);
};
const mapStyles = [
    {
        featureType: 'all',
        elementType: 'all',
        stylers: [{visibility: 'off'}]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{visibility: 'on'}]
    },
    {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{visibility: 'on'}]
    }
];
const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in kilometers
    return R * c;
};

const MapComponent: React.FC<MapComponentProps> = ({onMapClick}) => {
    const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
    const [distance, setDistance] = useState<number | null>(null);

    const handleMapClick = (event: any) => {
        const {latLng} = event;
        if (latLng) {
            const newMarker = {
                lat: latLng.lat(),
                lng: latLng.lng()
            };
            setMarkers((current) => {
                const newMarkers = [...current, newMarker];
                if (newMarkers.length > 2) {
                    newMarkers.shift(); // Maintain only the latest two markers
                }
                if (newMarkers.length === 2) {
                    const dist = calculateDistance(newMarkers[0].lat, newMarkers[0].lng, newMarkers[1].lat, newMarkers[1].lng);
                    setDistance(dist);
                    onMapClick(newMarkers, dist);
                } else {
                    setDistance(null);
                    onMapClick(newMarkers, null);
                }
                return newMarkers;
            });
        }
    };

    const handleMarkerClick = (index: number) => {
        setMarkers((current) => current.filter((_, i) => i !== index));
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                    onClick={handleMapClick}
                    options={{styles: mapStyles, mapTypeId: 'roadmap'}}

                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => handleMarkerClick(index)}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            {/*<div>*/}
            {/*    <h3>Marker Locations:</h3>*/}
            {/*    <ul>*/}
            {/*        {markers.map((marker, index) => (*/}
            {/*            <li key={index}>*/}
            {/*                Marker {index + 1}: Latitude: {marker.lat}, Longitude: {marker.lng}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*    {distance !== null && (*/}
            {/*        <div>*/}
            {/*            <h2>Distance between markers: {distance.toFixed(2)} KM</h2>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default MapComponent;
