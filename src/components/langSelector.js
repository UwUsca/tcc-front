import '../App.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importe o hook de tradução
import brazilFlag from '../imgs/br.svg';
import usFlag from '../imgs/us.svg';
import arrow from '../imgs/chevron-down-solid.svg';
import './langSelector.css'

function LangSelector() {
  const { t, i18n } = useTranslation(); // Use o hook de tradução para acessar as traduções e o objeto i18n
 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(brazilFlag);
  const [selectedLang, setSelectedLang] = useState(i18n.language); // Obtenha o idioma atual do i18n
 
  const languages = [
    { code: 'pt', name: t('Português'), flag: brazilFlag }, // Use o t() para traduzir os idiomas
    { code: 'en', name: t('English'), flag: usFlag },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (langCode, flag) => {
    i18n.changeLanguage(langCode); // Mude o idioma com o i18n
    setSelectedFlag(flag);
    setSelectedLang(langCode);
    setIsOpen(false);
  };

  return (
    <div className="lang-selector">
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        <div className="selected-language" onClick={toggleDropdown}>
          <img src={selectedFlag} alt="Flag" />
          {selectedLang === 'pt' ? t('PT') : t('EN')} {/* Traduza o idioma selecionado */}
          <img className={`arrow ${isOpen ? 'up' : 'down'}`} src={arrow} alt="Arrow" />
        </div>
        <ul className="language-list">
          {languages.map((lang) => (
            <li key={lang.code} onClick={() => changeLanguage(lang.code, lang.flag)}>
              {lang.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LangSelector;
