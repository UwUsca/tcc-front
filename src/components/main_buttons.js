import React from "react";
import { Link } from 'react-router-dom';
import './main_button.css'
import { useTranslation } from 'react-i18next';


function MainButton(ativo){

    const { t } = useTranslation();

    return (
        <div className='main-buttons'>
            <Link to='/pontos'>
            <button className={`button-option ${ativo.ativo=='pontos' ? 'button-on' : 'button-off'}`}>
                {t('Pontos Turisticos')}
            </button>
            </Link>
            <Link to='/emergencia'>
            <button className={`button-option ${ativo.ativo=='emergencia' ? 'button-on' : 'button-off'}`}>
                {t('Emergências')}
            </button>
            </Link>
            <Link to='/faq'>
            <button className={`button-option ${ativo.ativo=='faq' ? 'button-on' : 'button-off'}`}>
                {t('Perguntas Frequentes')} 
            </button>
            </Link>
        </div>
        );
    };

export default MainButton;