import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./map.module.css";
import { MapContainer,Popup,Marker,TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hook/useGeoLocation";
import Button from "./Button";
import { useUrlPos } from "../hook/useUrlPos";
function Map(){
   const [maplat,maplng]=useUrlPos();
   const [mapPos,setMapPos]=useState([40,0]);
 const {isLoading: isLoadingPos,position:geolocationPos,getPosition}=useGeolocation();
   const {cities}=useCities();
   useEffect(
    function(){
    if(maplat && maplng) setMapPos([maplat,maplng])
    },[maplat,maplng]);
   

    useEffect(
      function(){
    if(geolocationPos)
      setMapPos([geolocationPos.lat,geolocationPos.lng]);
    },[geolocationPos]);


    return (
        <div className={styles.mapContainer}>
        <Button type="position" onClick={getPosition}>
          {isLoadingPos ? "Loading.." : "Get your Current Location"}
        </Button>

            <MapContainer center={mapPos} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
   
     {cities.map(city=> <Marker position={[city.position.lat,city.position.lng]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>)} 
    <ChangeCenter pos={mapPos} />
    <DetectClick/>
  </MapContainer>
        </div>
    )
}
function ChangeCenter({pos}){
    const map=useMap();
    map.setView(pos);
    return null;
}

function DetectClick(){
    const navigate=useNavigate();
    useMapEvents({
        click:e=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}
export default Map;