import '../App.css'
import React from "react";

import { Link } from 'react-router-dom';
const handleClick = event => {
    var id_name = event.currentTarget.id;
    var query_class = document.querySelectorAll('.btn_select_page');

    query_class.forEach((element) => {
        element.classList.remove('btn_active')
    });

    switch(id_name){
        case 'btn_select_pontos':
            document.getElementById('btn_select_pontos').classList.add('btn_active')
            break;
        case 'btn_select_emergencia':
            document.getElementById('btn_select_emergencia').classList.add('btn_active')
            break;
        case 'btn_select_faq':
            document.getElementById('btn_select_faq').classList.add('btn_active')
            break;
        default:
            break;
    }

}

function SelectButtons(page){
    var class_state = ['btn_select_page btn_active', 'btn_select_page', 'btn_select_page'];
    if(page.page === 'pontos'){
        class_state = ['btn_select_page btn_active', 'btn_select_page', 'btn_select_page'];
    } else if(page.page === 'emergencia'){
        class_state = ['btn_select_page', 'btn_select_page btn_active', 'btn_select_page'];
    } else if(page.page === 'faq'){
        class_state = ['btn_select_page', 'btn_select_page', 'btn_select_page  btn_active'];
    }

    return(
        <div className='div_select_page'>
            <Link to='/Pontos' className={class_state[0]} id='btn_select_pontos' onClick={handleClick}> 
                PONTOS TURISTICOS
            </Link>
            <Link to='/Emergencia' className={class_state[1]} id='btn_select_emergencia' onClick={handleClick}> 
                EMERGÊNCIA
            </Link>
            <Link to='/Faq' className={class_state[2]} id='btn_select_faq' onClick={handleClick}> 
                FAQ
            </Link>
        </div>
    )
}

export default SelectButtons;