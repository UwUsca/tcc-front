import '../App.css'
import React, { useState } from "react";
import './menuHeader.css'
import arrow from '../imgs/chevron-down-solid.svg'
import brazilFlag from '../imgs/br.svg'
import usFlag from '../imgs/us.svg'
import bars from '../imgs/bars-solid.svg'
import userIcon from '../imgs/user-solid.svg'
import logoutIcon from '../imgs/logout-solid.svg'
import adminIcon from '../imgs/user-gear-solid.svg'

import { Link, useNavigate } from 'react-router-dom';

function MenuHeader(){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("PT");
    const [selectedFlag, setSelectedFlag] = useState(brazilFlag);
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

    const languages = [
        { img: userIcon, name: "Perfil", link: '/perfil', click: null},
        { img: logoutIcon, name: "Logout", link: '/', click: handleLogout},
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLang = (flag, lang) => {
        setSelectedFlag(flag);
        setSelectedLang(lang);
        setIsOpen(false);
    };


    return (
        <div className="lang-selector">
        <div className={`dropdown ${isOpen ? "open" : ""}`}>
            <div className="selected-menu" onClick={toggleDropdown}>
                <img src={bars}></img>
            </div>
            <ul className="language-list">
            {languages.map((lang) => (
                <Link to={lang.link}>
                    <button className='container_button_profile' onClick={lang.click}>
                        <img className='icon_buttons' src={lang.img} alt=''/>
                        <p>{lang.name}</p>
                    </button>
                </Link>
            ))}
            {isAdmin ? (
                <Link to={'/homeAdmin'}>
                    <button className='container_button_profile' onClick={null}>
                        <img className='icon_buttons' src={adminIcon} alt=''/>
                        <p>Admin</p>
                    </button>
                </Link>
            ) : null}
            </ul>
        </div>
        </div>
    );
}

export default MenuHeader;