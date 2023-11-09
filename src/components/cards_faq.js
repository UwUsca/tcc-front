import './cards_faq.css'
import React, {useState} from "react";
import PointerLeft from '../imgs/iconE.png'

function CardFaq(pergunta, resposta){

    const [showAnswer, setShowAnswer] = useState(false);

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return(
        <div className='card_faq' onClick={toggleAnswer}>
            <div className='card_text_faq_container'>  
                <p className='card_text_faq'> {pergunta.pergunta} </p>
                <img className='icon_faq' src={PointerLeft} alt='' style={{ transform: showAnswer ? 'rotate(0deg)' : 'rotate(90deg)' }}/>
            </div>

            {showAnswer && (
                <p className='card_text_resposta '>
                {pergunta.resposta}
                </p>
            )}
        </div>
    )
}

export default CardFaq;