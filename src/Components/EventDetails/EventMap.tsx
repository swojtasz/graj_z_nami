import { GoogleMap, Marker } from '@react-google-maps/api';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Card, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { eventDetails } from '../Dashboard';
const { Title } = Typography;

const mapContainerStyle = {
    width: '100%',
    height: '80vh',
};

export const EventMap: React.FC<eventDetails> = (event: eventDetails) => {
    const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({ lat: 55.107883, lng: 17.038538 });
    const [joined, setJoined] = useState(false);
    useEffect(() => {
        const getAddress = async () => {
            const results = await geocodeByAddress(event.place);
            const latLng: google.maps.LatLngLiteral = await getLatLng(results[0]);
            setCoordinates(latLng);
            setJoined(true);
        };
        getAddress();
    }, []);

    if (joined) {
        return (
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={coordinates}>
                <Marker position={coordinates!}></Marker>
            </GoogleMap>
        );
    } else {
        return (
            <div>
                <Card
                    title={<Title level={4}>Mapa</Title>}
                    style={{ textAlign: 'center', minHeight: '80vh', marginLeft: '1%' }}
                >
                    <Title level={3}>Dołącz do listy, aby odblokować lokalizację</Title>
                </Card>
            </div>
        );
    }
};
