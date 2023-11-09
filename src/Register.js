import './components/login_register.css';
import axios from "axios";
import Header from './components/header';
import ImageCarouselIndex from './components/carrosselIndex';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./components/logo";
import alertIcon from './imgs/circle-exclamation-solid.svg';
import Alert from '@mui/material/Alert'
import { useTranslation } from 'react-i18next';


function Register() {
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


  const url = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

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

  return (
    <div className="outer_container">
      <Header/>
      <div className="dark_overlay"></div>
      <div className="div_container_register_info">
        <div className="form_container">
        
        {sucesso ? <Alert variant="outlined" severity="success">
            {t('Registro realizado com sucesso! Um email foi enviado para confirmar seu cadastro')}
        </Alert> : null}
          <form id='login' onSubmit={handleSubmit}>     
            <h1>{t('Registrar')}</h1>

           <div className="div_alert_error">
              <img className="icons_alert" src={alertIcon}/>
              <div className="text_alert"></div>
              <img className="icons_alert" src={alertIcon}/>
            </div>

            <br/><br/>
            {/* Nome */}
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a>{t('NOME')}</span>
            <br/>
            <input
              className="inp_login"
              type="text"
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <br/>
            {/* Email */}
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a>{t('EMAIL')}</span>
            <br/>
            <input
              className="inp_login"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <br/>
            {/* Confirmar Email */}
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a>{t('CONFIRMAR EMAIL')}</span>
            <br/>
            <input
              className="inp_login"
              type="email"
              name="email"
              id="email_conf"
              value={confirmarEmail}
              onChange={e => setConfirmarEmail(e.target.value)}
              required
            />
            <br/>
            {/* Senha */}
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a>{t('SENHA')}</span>
            <br/>
            <input
              className="inp_login"
              type="password"
              name="password"
              id="password"
              value={senha}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <br/>
            {/* Confirmar Senha */}
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a>{t('CONFIRMAR SENHA')}</span>
            <br/>
            <input
              className="inp_login"
              type="password"
              name="password"
              id="password_conf"
              value={confirmarSenha}
              onChange={e => setConfirmarPassword(e.target.value)}
              required
            />
            <br/>
            {/* Idade */}
            <span className="legenda">{t('IDADE')}</span>
            <br/>
            <input
              className="inp_login"
              type="text"
              name="idade"
              id="idade"
              value={idade}
              onChange={e => setIdade(e.target.value)}
            />
            <br/>
            {/* Sexo */}
            <span className="legenda">{t('SEXO')}</span>
            <br/>
            <input
              className="inp_login"
              type="text"
              name="sexo"
              id="sexo"
              value={sexo}
              onChange={e => setSexo(e.target.value)}
            />
            <br/><br/>
            <input type="submit" value="Registrar" className='btn_submit'/>
            <br/><br/>
            <Link to='/Login'>
              <span className="to_register">{t('Já tem uma conta? Clique aqui!')}</span>
            </Link>
          </form>
        </div>
      </div>
      <ImageCarouselIndex/>
    </div>
  );
}

export default Register;
