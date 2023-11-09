import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import Header from './components/header';
import defaultIcon from './imgs/user-solid.svg';
import editIcon from './imgs/pen-solid.svg';
import deleteIcon from './imgs/xmark-solid.svg'
import lockedIcon from './imgs/lock-solid.svg'
import conquistaIcon from './imgs/iconE.png'
import { Link } from 'react-router-dom'; // Importe o componente Link
import { useTranslation } from 'react-i18next';


function Perfil() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [idadeUsuario, setIdadeUsuario] = useState('');
  const [sexoUsuario, setSexoUsuario] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null); // Estado para a foto de perfil
  const [favoritos, setFavoritos] = useState([]); // Novo estado para a lista de favoritos
  const [favoritosDetalhes, setFavoritosDetalhes] = useState([]);
  const [conquistas, setConquistas] = useState([]); // Novo estado para os detalhes dos locais favoritos
  const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
  const { t } = useTranslation();



  function convertToBase64(file) {
    var reader = new FileReader();
    reader.onload = () => {
      setFotoPerfil(reader.result); // Defina a imagem de perfil como Base64
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    reader.readAsDataURL(file);
  }
    // Função para lidar com a seleção de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Chame a função para converter a imagem em Base64
      convertToBase64(file);
    } else {
      setFotoPerfil('');
    }
  };

  const handleRemoveImage = () => {
    // Lógica para remover a imagem do perfil
    // Atualiza a variável fotoPerfil para um valor vazio (ou null, dependendo da estrutura do seu banco de dados)
    setFotoPerfil('');
  };

  const handleEditarClick = () => {
    // Quando o botão "Editar" é clicado, entre no modo de edição
    setEditMode(true);
  };

  const handleConfirmarClick = async () => {
    // Quando o botão "Confirmar" é clicado, saia do modo de edição e atualize os dados no servidor
    setEditMode(false);

    try {
      const userId = localStorage.getItem('userId');
      const url = process.env.REACT_APP_API_URL;

      // Envie os dados atualizados para o servidor
      await axios.patch(`${url}/user/${userId}`, {
        nome: nomeUsuario,
        email: emailUsuario,
        idade: idadeUsuario,
        sexo: sexoUsuario,
        foto: fotoPerfil,
      });

      // Atualize os dados do usuário na tela
      // Seu código para buscar os dados do usuário novamente aqui...

    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('Usuário não logado');
          return;
        }

        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);
        const data = response.data;

        setNomeUsuario(data.nome);
        setEmailUsuario(data.email);
        setIdadeUsuario(data.idade);
        setSexoUsuario(data.sexo);
        setFotoPerfil(data.foto); // Defina a foto de perfil a partir dos dados do usuário
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchFavoritos = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('Usuário não logado');
          return;
        }

        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);

        if (response.data && response.data.favoritos) {
          setFavoritos(response.data.favoritos);
          // Para cada local favorito, obtenha seus detalhes
          const detalhesPromises = response.data.favoritos.map(async (localId) => {
            const localResponse = await axios.get(`${url}/locals/${localId}`);
            return localResponse.data;
          });
          // Aguarde todas as solicitações para obter detalhes dos locais favoritos
          const detalhesLocais = await Promise.all(detalhesPromises);
          setFavoritosDetalhes(detalhesLocais);
        }
      } catch (error) {
        console.error('Error fetching favoritos:', error);
      }
    };

    const fetchConquistas = async () => {
      try {
        const userId = localStorage.getItem('userId');
    
        if (!userId) {
          console.error('Usuário não logado');
          return;
        }
    
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);
    
        if (response.data && response.data.conquistas) {
          // Define as conquistas do usuário
          setConquistas(response.data.conquistas);
        }
      } catch (error) {
        console.error('Error fetching conquistas:', error);
      }
    };
    

    fetchUsuario();
    fetchFavoritos();
    fetchConquistas();
  }, []);

  const navigateToLocal = (localId) => {
    // Crie a URL apropriada para a página do local
    const localUrl = `localhost:3000/pontos/Local/${localId}`;

    // Use o componente Link para navegar para a página do local
    return (
      <Link to={localUrl}>
      </Link>
    );
  };

  return (
    <div>
      <Header />
      <div style={{ height: '75px' }}></div>
      <div style={{display:'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px'}}>
        <div className='profile_header_container'>
          <div className="profile_header">
            <div className="profile_avatar">
                <img src={fotoPerfil || defaultIcon} alt="Imagem de Perfil" className="avatar_image" style={{ filter: editMode ? 'brightness(50%)' : 'brightness(100%)' }}
                />
                {editMode && (
                  <div className="edit_image">
                    <span className='span_container'>
                      <span style={{ fontSize: '40px' }}>+</span>
                      <br />
                      Alterar imagem
                    </span>
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                </div>
                )}
                {editMode && fotoPerfil && (
                  <button 
                  onClick={handleRemoveImage}
                  className='delete_image'
                  >
                    <img src={deleteIcon}></img>
                  </button>
                )}
              </div>
              <div className="profile_info">
                {editMode ? ( // Se estiver no modo de edição, exiba campos de entrada
                  <>
                    <input
                      className='input_name_edit'
                      type="text"
                      value={nomeUsuario}
                      onChange={(e) => setNomeUsuario(e.target.value)}
                    />

                    <div className="divider" />
                    
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                      <b>{t('Email')}:</b>
                    <input
                      className='input_info_edit'
                      type="text"
                      value={emailUsuario}
                      onChange={(e) => setEmailUsuario(e.target.value)}
                      style={{ width: '100%', display: 'inline' }}
                    />
                    </p>
                    <p>
                      <b>{t('Idade')}:</b> 
                      <select
                        className='input_info_edit'
                        value={idadeUsuario}
                        onChange={(e) => setIdadeUsuario(e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {[...Array(100)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                      </select> {t('anos')}</p>
                    <p>
                      <b>{t('Sexo')}:</b>
                      <input
                      className='input_info_edit'
                      type="text"
                      value={sexoUsuario}
                      onChange={(e) => setSexoUsuario(e.target.value)}
                    />
                    </p>
                  </>
                ) : (
                  <>
                    <h2>{nomeUsuario}</h2>
                    <div className="divider" />
                    <p><b>{t('Email')}:</b> {emailUsuario}</p>
                    <p><b>{t('Idade')}:</b> {idadeUsuario} {t('anos')}</p>
                    <p style={{textTransform: 'capitalize'}}><b>{t('Sexo')}:</b> {sexoUsuario}</p>
                  </>
                )}
                
              </div>
              {editMode ? ( // Exiba o botão "Confirmar" no modo de edição
                  <button className="button_confirm_infos" onClick={handleConfirmarClick}>{t('Confirmar')}</button>
                ) : (
                  <button className="button_edit_infos" onClick={handleEditarClick}>
                    <img src={editIcon} alt="Editar"></img>  
                  </button>
                )}
          </div>
        </div>
        <div className="profile_container">
          <div className="profile_sections">
            <div className="profile_section">
              <h3>{t('Favoritos')}</h3>
              <div className="divider" />
              <ul className="favorito_list">
                {favoritosDetalhes.map((local, index) => (
                  <li className="card_favorito" key={local._id}>
                    <Link to={`/pontos/Local/${local._id}`} className='card_favorito_content'>
                      <img src={local.foto} alt={`Local ${local.nome}`}/>
                      <p className='card_favorito_text'>{local.nome}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile_section">
              <h3>{t('Conquistas')}</h3>
              <div className="divider" />
              <ul>
              {conquistas.map((conquista, index) => {
                const progresso = Math.min(conquista.progresso, conquista.meta);
                const iconToShow = progresso >= conquista.meta ? conquistaIcon : lockedIcon;

                return(
                  <li className='conquista_card' key={conquista._id}>
                    <div style={{display: 'flex'}}>
                      <div className='conquista_icon'>
                        <img src={iconToShow}/>
                      </div>
                      <div className='conquista_container_text'>
                        <p><b>{conquista.nome}</b></p>
                        <p className='conquista_desc'>{conquista.descricao}</p>
                      </div>
                    </div>
                    <p className='progress_text'>
                      Progresso: {progresso} / {conquista.meta}
                    </p>
                    <div className="progress_bar">
                      <div
                        className="progress"
                        style={{
                          width: `${(progresso / conquista.meta) * 100}%`,
                        }}
                      />
                    </div>
                  </li>
                )})
              }
            </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
