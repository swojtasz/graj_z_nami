import { GoogleMap, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useState } from 'react';
import { Input } from 'antd';

export const Map = (props: any) => {
    const onSetAddress = (value: string) => {
        setAddress(value);
    };

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>();
    const [center, setCenter] = useState({ lat: 51.107883, lng: 17.038538 });

    const handleSelect = async (addressValue: string) => {
        const results = await geocodeByAddress(addressValue);
        const latLng: google.maps.LatLngLiteral = await getLatLng(results[0]);
        setAddress(addressValue);
        setCoordinates(latLng);
        setCenter(latLng);
        props.handleGetAddress(addressValue);
    };

    const mapContainerStyle = {
        width: '100%',
        height: '70vh',
    };

    return (
        <div>
            <PlacesAutocomplete value={address} onChange={onSetAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <Input
                            {...getInputProps({
                                placeholder: 'Type address...',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <p>Loading...</p>}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? '#41b6e6 ' : '#fff',
                                    display: 'flex',
                                };

                                return (
                                    // eslint-disable-next-line react/jsx-key
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={{ coordinates } ? 12 : 15} center={center}>
                <Marker position={coordinates!}></Marker>
            </GoogleMap>
        </div>
    );
};
