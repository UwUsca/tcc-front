import axios from "axios";
import Header from './components/header';
import ImageCarouselIndex from './components/carrosselIndex';
import './components/login_register.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./components/logo";
import alertIcon from './imgs/circle-exclamation-solid.svg'
import { useTranslation } from 'react-i18next';


function Login() {
  const { t } = useTranslation();


  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleLogout = () => {
    // Limpar o token de autenticação armazenado
    localStorage.removeItem("token");
    
    // Limpar o userId e o adm armazenados
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  
    // Redirecionar para a página de login
    navigate("/");
  };

  const isUserLoggedIn = !!localStorage.getItem("token"); // Verifica se o token está presente

  const navigate = useNavigate(); // Hook useNavigate para redirecionamento

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
    .post("/auth", { email, senha })
    .then(async (response) => {
      console.log(response);
      const token = response.data.token;
      const userId = response.data.id;
  
      // Armazenar o token no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
  
      try {
        // Buscar os dados do usuário com base no userId
        const userResponse = await axiosInstance.get(`/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const userData = userResponse.data;
  
        // Verificar o atributo "adm" do usuário e armazenar no localStorage
        const isAdmin = userData.adm;
        localStorage.setItem("isAdmin", isAdmin);
  
        // Redirecionar para a página correta com base no atributo "adm"
        if (isAdmin) {
          navigate("/homeAdmin");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    })
      .catch((error) => {
        if (error.response) {
          // O servidor respondeu com um status de erro (por exemplo, 400, 401, 500, etc.)
          console.error(error.response.data); // Exibe a mensagem de erro do servidor

          var alert_div = document.getElementsByClassName('div_alert_error')[0];
          var alert_text = document.getElementsByClassName('text_alert')[0];
          if(email != '' || senha != ''){
            alert_div.style = 'display: flex'
            alert_text.innerHTML = 'EMAIL E/OU SENHA INCORRETOS'
          } else if (email == '' || senha == ''){
            alert_div.style = 'display: flex'
            alert_text.innerHTML = 'CAMPOS OBRIGATÓRIOS VAZIOS'
          }
          
          console.error(error.response.status); // Exibe o status de erro do servidor
        } else if (error.request) {
          // A solicitação foi feita, mas não houve resposta do servidor
          console.error(error.request); // Exibe o objeto de solicitação
        } else {
          // Ocorreu um erro durante a configuração da solicitação
          console.error("Erro:", error.message); // Exibe a mensagem de erro
        }
      });
  };

  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  return (
    <div className="outer_container">
      <Header/>
      <div className="dark_overlay"></div>
      <div className="div_container_login_info">
        <div className="form_container">
          <form action='' id='login' method='' onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="div_alert_error">
              <img className="icons_alert" src={alertIcon}/>
              <div className="text_alert"></div>
              <img className="icons_alert" src={alertIcon}/>
            </div>
            
            <br></br>
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a> EMAIL</span>
            <br/>
            <input
              className="inp_login"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a>{t('SENHA')}</span>
            <br/>
            <input
              className="inp_login"
              type="password"
              name="password"
              id="password"
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/><br/>
            
            <input type="submit" value="Login" className='btn_submit'/>
            <br/><br/>
            <Link to='/Register'>
              <span className="to_register">{t('Não tem uma conta? Clique aqui!')}</span>
            </Link>
          </form>
        </div>
      </div>
      <ImageCarouselIndex/>
    </div>
  );
}

export default Login;