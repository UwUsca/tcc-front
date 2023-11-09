import '../App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userIcon from '../imgs/user-solid.svg'
import logoutIcon from '../imgs/logout-solid.svg'
import returnIcon from '../imgs/chevron-left-solid.svg'
import logoHeader from '../imgs/logo-escuro.png'
import { Link, useNavigate } from 'react-router-dom';

function SmallHeader(){
    const [nomeUsuario, setNomeUsuario] = useState('');
    const handleLogout = () => {
        // Limpar o token de autenticação armazenado
        localStorage.removeItem("token");
        
        // Limpar o userId e o adm armazenados
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
      
        // Redirecionar para a página de login
        navigate("/");
      };

    const isUserLoggedIn = !!localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
          try {
            // Obtém o ID do usuário do localStorage
            const userId = localStorage.getItem('userId');
        
            // Verifica se há um usuário logado
            if (!userId) {
              console.error('Usuário não logado');
              return;
            }
        
            // Faça uma solicitação GET para buscar o nome do usuário e o status de administrador
            const url = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${url}/user/${userId}`);
            const data = response.data;
        
            setNomeUsuario(data.nome); // Armazene o nome do usuário no estado
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
      
        fetchUsuario();
      }, []);

    return(
        <div>
            <div id="div_header">
                <div className='container_button_logout_mini'>
                    <button onClick={() => navigate(-1)} id='button_voltar' title='Logout'>
                        <img className='icon_buttons' src={returnIcon} alt=''/>
                    </button>
                </div>
                <div id='div_header_img'>
                    <Link to='/'>
                        <img src={logoHeader}></img>
                    </Link>
                </div>
                {isUserLoggedIn && (
                <div className='container_button_logout_mini'>
                   <div className='header_username_mini'>Olá, {nomeUsuario}</div>
                    <button onClick={handleLogout} id='button_logout' title='Logout'>
                        <img className='icon_buttons' src={logoutIcon} alt=''/>
                    </button>
                </div>
                )}
                {!isUserLoggedIn && (
                <Link to='/login'>
                    <button id='button_login' title='Fazer Login'>
                        <img className='icon_buttons' src={userIcon} alt=''/>
                    </button>
                </Link>
                )}
            </div>
        </div>
    )
}

export default SmallHeader;