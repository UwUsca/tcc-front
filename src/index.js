import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import RegisterLocal from './RegisterLocal';
import UpdateDeleteUsuario from './UpdateDeleteUsuario';
import UpdateDeleteLocal from './UpdateDeleteLocal';
import App from './App';
import Pontos from './Pontos';
import Faq from './Faq';
import Emergencia from './Emergencia';
import Local from './Local';
import HomeAdmin from './HomeAdmin';
import UpdateDeleteEmergencia from './UpdateDeleteEmergencia';
import RegisterEmergencia from './RegisterEmergencia';
import Perfil from './Perfil';
import AdicionarLocal from './AdicionarLocal';
import ConfirmarEmail from './ConfirmarEmail';
import TelaAceitacao from './TelaAceitacao';
import i18n from './i18n'; // Importe a configuração do i18next



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<App  />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/RegisterLocal" element={<RegisterLocal />} />
      <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
      <Route path="/UpdateDeleteUsuario" element={<UpdateDeleteUsuario />} />
      <Route path="/UpdateDeleteLocal" element={<UpdateDeleteLocal />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/HomeAdmin" element={<HomeAdmin />} />
      <Route path="/Pontos" element={<Pontos />} />
      <Route path="/Faq" element={<Faq />} />
      <Route path="/Emergencia" element={<Emergencia />} />
      <Route path="/UpdateDeleteEmergencia" element={<UpdateDeleteEmergencia />} />
      <Route path="/RegisterEmergencia" element={<RegisterEmergencia />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/AdicionarLocal" element={<AdicionarLocal />} />
      <Route path="/pontos/local/:id" element={<Local />} />
      <Route path="/LocalAux" element={<TelaAceitacao />} />
      <Route path="/verificar-email" element={<ConfirmarEmail />}
      
      
/>


    </Routes>
    </BrowserRouter>
  </React.StrictMode>
); 


