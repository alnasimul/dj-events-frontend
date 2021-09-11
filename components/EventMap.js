import Image from 'next/image';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";
const EventMap = ({ event }) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewport, setViewport] = useState({
        latitude: 40.712772,
        longitude: -73.935242,
        width: '100%',
        height: '500px',
        zoom: 12,
    });

    // avoiding this functionality because of some errors

    // useEffect(() => {
    //     // Get latitude & longitude from address.
    //     Geocode.fromAddress(event.address).then(
    //         (response) => {
    //             const { lat, lng } = response.results[0].geometry.location
    //             setLat(lat)
    //             setLng(lng)
    //             setViewport({ ...viewport, latitude: lat, longitude: lng })
    //             setLoading(false)
    //         },
    //         (error) => {
    //             console.error(error)
    //         }
    //     )
    // }, [])
   // Geocode.setApiKey(process.env.NEXT_PUBLIC_GEOAPIFY_KEY);

   // using this geopify api instead of google api
    useEffect(() => {
        const requestOptions = {
          method: 'GET',
        };
        fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${event.address}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`,
          requestOptions,
        )
          .then((response) => response.json())
          .then((result) => {
            const lng = result.features[0].bbox[0];
            const lat = result.features[0].bbox[1];
            setLat(lat);
            setLng(lng);
            setViewport({ ...viewport, latitude: lat, longitude: lng });
            setLoading(false);
          })
          .catch((error) => console.log('error', error));
      }, []);

  
    if(loading){
        return false;
    }
    return (
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN } onViewportChange={(vp) => setViewport(vp)}>
            <Marker key={event.id} latitude={lat} longitude={lng}>
                <Image src='/images/pin.svg' width={30} height={30}/>
            </Marker>
        </ReactMapGL>
    );
}

export default EventMap;