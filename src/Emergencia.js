import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/header';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardEmergencia from './components/cards_emergencia';

import icon from './imgs/iconE.png'

function Emergencia() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/emergency`).then((result) => {
      result.json().then((resp) => {
        setUsers(resp);
      });
    });
  }

  return (
    <div>
      <Header/>
      <div style={{height: '75px'}}></div>
      <PontosTitle text="TELEFONES ÚTEIS" />
      <div className='emergencia_content'>
          {users.map((user) => (
            <CardEmergencia
              nome={user.nome}
              numero={user.numero}
              url_img={user.logo}
              />
            ))}
          </div>
    </div>
  )
}

export default Emergencia;
