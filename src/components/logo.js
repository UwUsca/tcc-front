import '../App.css'
import React from "react";

import logoImg from '../imgs/logo-escuro.png'
import { Link } from 'react-router-dom';

function Logo(){
    return(
    <div id='img_logo'>
        <Link to='/'>
            <img src={logoImg} alt='' title='CuritibAki!'/>
        </Link>
    </div>
    )
}

export default Logo;