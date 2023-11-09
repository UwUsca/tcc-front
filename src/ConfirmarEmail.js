import { useNavigate } from "react-router-dom";
import Logo from "./components/logo";
import { useEffect, useState } from "react";
import './ConfirmarEmail.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import axios from "axios";

function ConfirmarEmail() {
    
    const url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate(); // Hook useNavigate para redirecionamento
    function goToLogin() {
        navigate("/login");
    }
    const [sendVerificarEmailRetorno, setSendVerificarEmailRetorno] = useState(undefined)
    const [sucesso, setSucesso] = useState(false)

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    });

    async function authVerificarEmail(token) {
        try {
            const response = await axiosInstance.post(`${url}/auth/confirmar-email`, {
                token
            });
            return response; // Retorna a resposta da solicitação HTTP
        } catch (error) {
            console.error("Erro ao verificar email:", error);
            throw error; // Lança o erro para que ele seja tratado em outro lugar, se necessário
        }
    }
    

    async function setup() {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')

        if (token) {
            const response = await authVerificarEmail({token})
            if (response.status === 200) {
                setSucesso(true)
                setSendVerificarEmailRetorno('Email verificado com sucesso')
                return
            }else{
                setSendVerificarEmailRetorno('Erro ao verificar email, erro: ' + response.status)
            }
        }
    }

    useEffect(() => {
        setup()
    }, [])

  return (
    <div id='page_login'>
        <Logo/>
        <Box sx={{ flexGrow: 1 }}className="buttonBox">
        <AppBar position="static">
            <Toolbar>
            <Button color="inherit" onClick={goToLogin}>Login</Button>
            </Toolbar>
        </AppBar>
        </Box>
        <div className="div_container_login_info">
            <div className="form_container">
                <h1 style={{color:'white'}}>Confirmação de email</h1>
                {sendVerificarEmailRetorno && 
                    sucesso ? <h2 className="sucessColor">{sendVerificarEmailRetorno}</h2>:<h2 className="errorColor">{sendVerificarEmailRetorno}</h2>
                }
            </div>
        </div>
    </div>
  );
}

export default ConfirmarEmail;