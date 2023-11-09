import './App.css';
import React, {useState} from "react";
import Header from './components/header';
import SmallHeader from './components/small_header';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardFaq from './components/cards_faq';
import { useTranslation } from 'react-i18next';
import PointerLeft from './imgs/iconE.png'
import AdicionarLocal from './AdicionarLocal';


function Faq() {
  const [showAnswer, setShowAnswer] = useState(false);

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

  const { t } = useTranslation();

  return (
    <div>
      <Header/>
      <div style={{height: '75px'}}></div>
      <PontosTitle text={t("Perguntas Frequentes")} />


      <div className='div_container_cards_pontos'>
        <div className='div_container_cards_emergencia'>
        <CardFaq
          pergunta={t('ONDE COMPRAR INGRESSOS PARA A LINHA DE TURISMO?')}
          resposta={t('R: As cartelas podem ser adquiridas diretamente nos ônibus (há um cobrador na parte inferior) ou em qualquer ponto de embarque. Também é vendido na Rodoferroviária das 12h30 às 18h30 em dias úteis. O preço é de R$50 (2021). A forma de pagamento da cartela da Linha Turismo é somente em dinheiro.')}
          />
        <CardFaq
          pergunta={t('PARA QUE SERVEM OS QR CODES?')}
          resposta={t('R: A utilização dos QR Codes visam a praticidade para o usuário, pois assim que ele scanear, será levado para o nosso site e poderá obter informações sobre o local!')}
          />
        <CardFaq
          pergunta={t('AS INFORMAÇÕES SÃO CONFIÁVEIS?')}
          resposta={t('R: Sim! Todas estão sendo tiradas de fontes oficiais, sendo atualizadas sempre que necessário.')}
          />
        
        <AdicionarLocal/>
          <div className='contato_faq'>
            <p className='card_text'>
            {t('COMO FAÇO PARA ENTRAR EM CONTATO COM OS RESPONSÁVEIS DO SITE?')}
            </p>
            <p className='card_text' style={{fontSize : '20px', lineHeight: '25px', color: '#f0f0f0', textTransform: 'none'}}>
            {t('R: Nos contate através do nosso email: curitibaki_faq@dominio.com')}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Faq