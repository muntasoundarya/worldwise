// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPos } from "../hook/useUrlPos";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL1="https://api.bigdatacloud.net/data/reverse-geocode-client"
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [latM,lngM]=useUrlPos();
  const [isLoadingGeo,setIsLoadingGeo]=useState(false);
  const [err,setErr]=useState("");
  const [emoji,setEmoji]=useState("");
  const {createCity}=useCities();
 useEffect(function(){
  if(!latM && !lngM) return ;
    async function fetchCityData(){
      try{
      setIsLoadingGeo(true);
      const res=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latM}&longitude=${lngM}`);
      const data=await res.json();
    
      if(!data.countryCode)
        throw new Error("That doesnt seem like a City.Click somewhere else");
      setCityName(data.city || data.locality || "");
      setCountry(data.country);
      setEmoji(data.countryCode);
      }
      catch(err){
  setErr(err.message);
      }
      finally{
        setIsLoadingGeo(false);
      }
    }

    fetchCityData();
 },[latM,lngM]);
function handleSubmit(e){
  e.preventDefault();

  if(!cityName || !date)
    return;

  const newCity={
    cityName,
    country,
    emoji,
    date,
    notes,
    position:{latM,lngM}
  };
  // createCity(newCity);
  console.log(newCity);
}
 if(isLoadingGeo)
  return <Spinner />
if(!latM && !lngM)
  return <Message message="Start By Clicking SomeWhere on the Map"/>
if(err){
  return <Message message={err}/>
}
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={date => setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton/>
        
      </div>
    </form>
  );
}

export default Form;
