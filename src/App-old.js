import './App.css';
import React from "react"
import Header from './components/header';

import Logo from './components/logo';
import { Link } from 'react-router-dom';
import PontosImg from './imgs/curitiba1.png'
import HospitalImg from './imgs/hospital.jpg'
import FaqImg from './imgs/faq.jpg'
import { useNavigate } from "react-router-dom";
import admIcon from './imgs/user-gear-solid.svg'
//import Routes from "./Routes";

function App() {
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

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
      <Logo/>
      <div className='div_container_card_menu'>
        <Link to='/Pontos'>
          <div className='div_child_card_menu' title='Pontos Turisticos'>
            <img src={PontosImg} alt='' />
            <div className='text_center'>PONTOS TURISTICOS</div>
          </div>
        </Link>
        <Link to='/Emergencia'>
          <div className='div_child_card_menu' title='Números de Emergência'>
            <img src={HospitalImg} alt='' />
            <div className='text_center'>EMERGÊNCIA</div>
          </div>
        </Link>
        <Link to='/Faq'>
          <div className='div_child_card_menu' title='FAQ'>
            <img src={FaqImg} alt='' />
            <div className='text_center'>PERGUNTAS FREQUENTES</div>
          </div>
        </Link>
      </div>
      {isAdmin? (
        <Link to='/homeadmin' className='button_home_admin'>
          <img className='icons_infos' src={admIcon} alt=''  style={{marginLeft: '0px', width: '30px'}}/>
          <div className='header_username'>Home Admin</div>
        </Link>
            ) : null}
    </div>
  )
}

export default App

