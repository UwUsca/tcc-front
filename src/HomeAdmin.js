import React, { useState } from "react";
import './HomeAdmin.css';
import { Link, useNavigate } from "react-router-dom";
import SmallHeader from "./components/small_header";
import MenuAdmin from "./components/menu_admin";
import RegisterLocal from "./RegisterLocal";
import PontosTitle from "./components/pontos_title";
import UpdateDeleteLocal from "./UpdateDeleteLocal";
import RegisterAdmin from "./RegisterAdmin";
import UpdateDeleteUsuario from "./UpdateDeleteUsuario";
import RegisterEmergencia from "./RegisterEmergencia";
import UpdateDeleteEmergencia from "./UpdateDeleteEmergencia";
import TelaAceitacao from "./TelaAceitacao";

function HomeAdmin() {

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  }





  const navigate = useNavigate();

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

  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verifica se o usuário é um administrador

  if (!isAdmin) {
    navigate("/"); 
    return null;
  }

  return (
      <div>
        <MenuAdmin/>
        <PontosTitle text={'Locais'}/>
        <RegisterLocal/>
        <UpdateDeleteLocal/>
        <TelaAceitacao/>
        <PontosTitle text={'Usuários'}/>
        <RegisterAdmin/>
        <UpdateDeleteUsuario/>
        <PontosTitle text={'Emergências'}/>
        <RegisterEmergencia/>
        <UpdateDeleteEmergencia/>
    </div>
  );
}

export default HomeAdmin;
