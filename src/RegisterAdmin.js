import './components/login_register.css';
import axios from "axios";
import Header from './components/header';
import ImageCarouselIndex from './components/carrosselIndex';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./components/logo";
import alertIcon from './imgs/circle-exclamation-solid.svg';
import arrow from './imgs/chevron-down-solid.svg';
import Alert from '@mui/material/Alert'
import { useTranslation } from 'react-i18next';



function RegisterAdmin() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [confirmarSenha, setConfirmarPassword] = useState('');
  const [idade, setIdade] = useState(''); // Adicione o estado para idade
  const [sexo, setSexo] = useState('');   // Adicione o estado para sexo
  const [sucesso, setSucesso] = useState(false);
  const [foto, setFoto] = useState('');
  const { t } = useTranslation();
  const [formVisible, setFormVisible] = useState(true);
  const [arrowRotated, setArrowRotated] = useState(false);
  const [envioFeito, setEnvioFeito] = useState(false);


  const url = process.env.REACT_APP_API_URL;

  const handleSubmit = e => {
    e.preventDefault();

    var alert_div = document.getElementsByClassName('div_alert_error')[0];
    var alert_text = document.getElementsByClassName('text_alert')[0];
    if (email !== confirmarEmail) {
      alert_div.style = 'display: flex'
      alert_text.innerHTML = 'OS EMAILS DEVEM SER IGUAIS'
      return;
    }

    if (senha !== confirmarSenha) {
      alert_div.style = 'display: flex'
      alert_text.innerHTML = 'AS SENHAS DEVEM SER IGUAIS'
      return;
    }

    // Verifica se o email já está em uso
    axiosInstance
      .get(`${url}/user?email=${email}`)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else if (response.data.emailExists) {
          alert('Este email já está em uso. Por favor, escolha outro email.');
        } else {
          // Realiza o registro se o email estiver disponível
          axiosInstance
            .post(`${url}/user`, {
              nome,
              email,
              senha,
              sexo,  // Inclua o sexo no objeto enviado à API
              idade,
              foto:'' // Inclua a idade no objeto enviado à API
            })
            .then(response => {
              console.log(response.statusText);
              if (response.statusText === 'Created') {
                axiosInstance
                .post(`${url}/auth/verificar-email`, {
                  email
                }).then(() => {
                  // Após o registro bem-sucedido, incrementar a conquista "Registrar"
                  const userId = response.data.usuario.id;
                  incrementAchievementProgress(userId);
                  console.log("Aqui1: " + userId);

                  // Em seguida, defina o estado de sucesso como verdadeiro
                  setSucesso(true);
                })
              }
            })
            .catch(error => {
              console.error(error.response);
              console.error(error.response.data);
              alert_div.style = 'display: flex'
              alert_text.innerHTML = 'EMAIL JÁ REGISTRADO'
              //alert("Cadastro Incorreto")
              // Trate o erro de registro aqui, se necessário
            });
        }
      })
      .catch(error => {
        console.error(error);
        alert("Cadastro Incorreto")
        // Trate o erro de verificação de email aqui, se necessário
      });

        setEnvioFeito(true);
        alert_div.style = 'display: none'
        setNome('');
        setEmail('');
        setPassword('');
        setConfirmarEmail('');
        setConfirmarPassword('');
        setIdade('');
        setSexo('');
        setTimeout(() => {
            setEnvioFeito(false);
        }, 2000);

      

  };

  function incrementAchievementProgress(userId) {
    const url = process.env.REACT_APP_API_URL;
  
    axios
      .post(`${url}/user/update-conquests/${userId}`, { "categoria": "Registrar", "progresso": 1 })
      .then((response) => {
        console.log('Achievement "Registrar" progress updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating achievement progress:', error);
      });
  }

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setArrowRotated(!arrowRotated);
  };

  return(
    <div>
      <div className='div_register_local'>
        <div className='form_container_reg_local'>
        <h1 onClick={toggleFormVisibility}>CADASTRAR USUÁRIO <img style={{height: '25px', filter: 'invert(100%)'}} className={arrowRotated ? 'arrow_h1_rotated' : 'arrow_h1_rotated_off'} src={arrow}></img></h1>
        <form className={`form_reg_local ${formVisible ? 'form-hidden' : 'form-visible'}`} action="" method="post" onSubmit={handleSubmit}>
            <div className="div_alert_error">
                <img className="icons_alert" src={alertIcon}/>
                <div className="text_alert"></div>
                <img className="icons_alert" src={alertIcon}/>
                </div>
          <label>
          <p className="form_p_local"><a style={{color: '#ff4747'}}>* </a>Nome</p>
            <input
              className='form_input_local'
              type="text"
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            /></label>

          <label>
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Email</p>
            <input
              className='form_input_local'
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            /></label>
          
          <label>
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Confirmar Email</p>
          <input
            className='form_input_local'
            type="email"
              name="email"
              id="email_conf"
              value={confirmarEmail}
              onChange={e => setConfirmarEmail(e.target.value)}
              required
          /></label>

          <label>
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Senha</p>
            <input
              className='form_input_local'
              type="password"
              name="password"
              id="password"
              value={senha}
              onChange={e => setPassword(e.target.value)}
              required
            /></label>

            <label>
              <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Confirmar Senha</p>
            <input
              className='form_input_local'
              type="password"
              name="password"
              id="password_conf"
              value={confirmarSenha}
              onChange={e => setConfirmarPassword(e.target.value)}
              required
            /></label>

            <label>
              <p className="form_p_local">Idade</p>
            <input
              className='form_input_local'
              type="text"
              name="idade"
              id="idade"
              value={idade}
              onChange={e => setIdade(e.target.value)}
            /></label>

            <label>
              <p className="form_p_local">Sexo</p>
            <input
              className='form_input_local'
              type="text"
              name="sexo"
              id="sexo"
              value={sexo}
              onChange={e => setSexo(e.target.value)}
            /></label>

            <label style={{display: 'flex', alignItems: 'center'}}>
              <input className="form_submit_local" type="submit" value={envioFeito ? "Registrado" : "Registrar"} />
            </label>
        </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterAdmin;
