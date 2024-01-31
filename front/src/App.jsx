import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom"
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import loading from "../src/assets/rnmIcon.png"
import style from "./App.css"
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/'


function App() {
 
  
   const [characters, setCharacters] = useState([]);

   const [access, setAccess] = useState (false);
   const [showLoading, setShowLoading] = useState(false);

   const login = async (userData) => {
     try {
       setShowLoading(true);
       const { email, password } = userData;
       const URL = 'http://localhost:3001/rickandmorty/login/';
       const response = await axios(URL + `?email=${email}&password=${password}`);
       const data = response.data;
       const { access } = data;
       setAccess(data);
 
       setTimeout(() => {
         setShowLoading(false);   
         access && navigate('/home');
       }, 4000);
     } catch (error) {
       setShowLoading(false);
       window.alert('El usuario no se encuentra registrado');
     }
   }
 

const navigate = useNavigate()

  useEffect(()=> {
   !access && navigate("/")
  }, [access]);


   const onSearch = async (id)=> {
      try {
         const URL = `http://localhost:3001/rickandmorty/character/${id}`
         const response = await axios(URL);
         const { data } = response;

         if (data.name){
      const characterExist = characters.find((char) =>  (char.id === data.id))
      if(!characterExist){
         setCharacters((oldChars) => [...oldChars, data])
      } else {
             window.alert("Este personaje ya fue agregado")}
   }
      } catch (error) {
         if (error.response) {
           window.alert('¡No hay personajes con este ID!');
         } else {
           window.alert('Error en la petición: ' + error.message);
         }
       }
     }



   const onClose = (id) => {
      setCharacters((prevCharacters) => {
        return prevCharacters.filter((character) => parseInt(character.id) !== parseInt(id));
      });
    };

   const location = useLocation();

   
 

   return (
      <div className='App'>
      {showLoading && (
  <div style={{
    position: 'relative',
   //  width: '100%',
   //  height: '100vh',
    display: 'flex',
    alignItems: 'center',
   //  justifyContent: 'center',
    flexDirection: "column",
  }}>
    <img src={loading} className='fade-out  ' alt="Cargando..." style={{
      width: '55%',
      height: 'auto', 
      zIndex: '999999',
      position: "relative",
      top: "-50px",
      left: "14px "
    }} />
    <h1 className='fade-out' style={{
      color: "white",
      textShadow: "1px 1px 1px black",
       }}>Loading<span>...</span></h1>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" className='fade-out' alt="Cargando..." style={{
      width: "10%", 
      height: '10%', 
      zIndex: '999999',
    }} />
  </div>
)}
      {location.pathname !== '/' && <Nav onSearch={onSearch} />}
      {!showLoading && (
         <Routes>
            
            <Route id='form' path="/" element={<Form login={login} />} />
            <Route path="/home" element={<Cards characters={characters} onClose={onClose} />} />
            <Route path="/about" element={<About />} />   
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
         </Routes>)}
      </div>
   );
}

export default App;