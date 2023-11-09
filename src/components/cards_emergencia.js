import React from "react";
import './cards_emergencia.css'


function CardEmergencia(nome, numero, url_img){
    return(
        <button className='card_emergencia_button'>
            <a href={`tel:${nome.numero}`}>
                <div className='card_emergencia'>
                    <div className='card_emergencia_img'>
                        <img src={nome.url_img}/>
                    </div>
                    <p className='card_text_emergencia'>{nome.nome}</p>
                    <p className='card_text_emergencia'>{nome.numero}</p>
                </div>
            </a>
        </button>
        
    )
}

export default CardEmergencia;