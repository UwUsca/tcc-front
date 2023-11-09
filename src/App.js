import './App.css';
import React from "react"
import Header from './components/header';
import ImageCarouselIndex from './components/carrosselIndex';
import MainButton from './components/main_buttons';
import { useNavigate } from "react-router-dom";

import logo from './imgs/logo-escuro.png'
import icon from './imgs/iconE.png'


import Logo from './components/logo';
import { Link } from 'react-router-dom';
import PontosImg from './imgs/curitiba1.png'
import HospitalImg from './imgs/hospital.jpg'
import FaqImg from './imgs/faq.jpg'
import admIcon from './imgs/user-gear-solid.svg'
//import Routes from "./Routes";
import { useTranslation } from 'react-i18next';

function App() {
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  const { t } = useTranslation();

  const handleLogout = () => {
    // Limpar o token de autenticação armazenado
    localStorage.removeItem("token");
    
    // Limpar o userId e o adm armazenados
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  
    // Redirecionar para a página de login
    navigate("/");
  };

  const isUserLoggedIn = !!localStorage.getItem("token"); // Verifica se o token está presente

  return (
    <div>
      <Header/>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="logo-central-index">
          <img src={logo}></img>
          <br></br>
          {t('VENHA CONHECER CURITIBA!')}
          <MainButton ativo=""/>
        </div>
      </div>
      <ImageCarouselIndex/>
    </div>
  )
}

export default App

