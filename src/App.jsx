import { useEffect, useState } from 'react'
import Homepage from './pages/Homepage';
import './index.css' ;
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import PageNotFound from './pages/PageNotFound';
import Form from './components/Form';
import { CitiesProvider} from './contexts/CitiesContext';


function App() {

 
  return ( 
    <CitiesProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="product" element={<Product />}/>
      <Route path="pricing" element={<Pricing />}/>
      <Route path="login" element={<Login />}/>
      <Route path="app" element={<AppLayout />}>
      <Route index element={<CityList/>}/>
      <Route path="cities" element={<CityList />}/>
      <Route path="cities/:id" element={<City/>} />
      <Route path="countries" element={<CountryList/>}/>
      <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
    </CitiesProvider>
  )
  
  
}

export default App
