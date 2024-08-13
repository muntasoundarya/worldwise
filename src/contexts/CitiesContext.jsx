import { createContext, useContext,useState,useEffect } from "react";


const citiesContext=createContext();

const BASE_URL="http://localhost:8000";
function CitiesProvider({children}){

    const [cities,setCities]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
   const [currentCity,setCurrentCity]=useState({});
  
    useEffect(function(){
     async function fetchCities(){
      try{
        setIsLoading(true);
        const res=await fetch(`${BASE_URL}/cities`);
        const data=await res.json();
        setCities(data);
      }
  
      catch{
        alert("There was a error loading data..")
  
      }
      finally{
        setIsLoading(false);
      }
     }
     fetchCities();
    },[])

    async function getCity(id){
        try{
            setIsLoading(true);
            const res=await fetch(`${BASE_URL}/cities/${id}`);
            const data=await res.json();
            setCurrentCity(data);
          }
      
          catch{
            alert("There was a error loading data..")
      
          }
          finally{
            setIsLoading(false);
          } 
  }

  // async function createCity(newCity){
  //   try{
  //     setIsLoading(true);
  //     const res=await fetch(`${BASE_URL}/cities`,{
  //       method :"POST",
  //       body: JSON.stringify(newCity),
  //       headers:{
  //         "Content-Type":"application/json",
  //       },
  //     });
  //     const data=await res.json();
  //     setCities(cities=>[...cities,data]);
  //   }
 
  //   catch{
  //     alert("There was a error loading data..")

  //   }
  //   finally{
  //     setIsLoading(false);
  //   }
  //  }
    return <citiesContext.Provider value={
        {
            cities,
            isLoading,
            currentCity,
            getCity, 
        }
    }>
      {children}
    </citiesContext.Provider>
}

function useCities(){
     const context=useContext(citiesContext);
     if(context === undefined)
        throw new Error("Cities Context was used outside the CitiesProvider");
     return context;
}

export {CitiesProvider,useCities};