import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './components/header';
import FormAnalytic from './components/form_analytic';
import commentIcon from './imgs/comment-regular.svg'
import timeIcon from './imgs/clock-solid.svg';
import ticketIcon from './imgs/ticket-solid.svg';
import mapIcon from './imgs/map-solid.svg';
import starIcon from './imgs/star-solid.svg';
import emptyStarIcon from './imgs/star-regular.svg';
import userIcon from './imgs/user-solid.svg'
import deleteIcon from './imgs/xmark-solid.svg'
import { useRef } from "react"
import PontosTitle from './components/pontos_title';
import './Local.css'
import ImageCarouselPontos from './components/carrossel_pontos';


function Local() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [sobre, setSobre] = useState('');
  const [horarios, setHorarios] = useState('');
  const [ingressos, setIngressos] = useState('');
  const [endereco, setEndereco] = useState('');
  const [foto, setFoto] = useState('');
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [fotoLocal, setFotoLocal] = useState('');
  

  const [nota, setNota] = useState('');
  const [hover, setHover] = useState(0);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);



  const [comentario, setComentario] = useState('');
  const [iframe, setIframe] = useState('');
  const [comentarioPaiId, setComentarioPaiId] = useState(''); 

  // eslint-disable-next-line
  const [nomeUsuario, setNomeUsuario] = useState('');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  const [reply, setReply] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [favoritado, setFavoritado] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [categoria, setCategoria] = useState('Avaliar');
  const [categoria2, setCategoria2] = useState('Fotografar');
  const [progresso, setProgresso] = useState(1);
  const userId = localStorage.getItem('userId');
  const [userFormTrue, setUserFormTrue] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Obtém o ID do usuário do localStorage
        const userId = localStorage.getItem('userId');
    
        // Verifica se há um usuário logado
        if (!userId) {
          console.error('Usuário não logado');
          return;
        }
    
        // Faça uma solicitação GET para buscar o nome do usuário e o status de administrador
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);
        const data = response.data;
    
        setNomeUsuario(data.nome); // Armazene o nome do usuário no estado
        setUserFormTrue(data.form);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  
    fetchUsuario();
  }, []);
  
  const handleDeleteComment = async (commentId) => {
    try {
      // Realize uma solicitação para excluir o comentário com base no commentId
      const url = `${process.env.REACT_APP_API_URL}/rating/${commentId}`;
      console.log(url);
      await axios.delete(url);
  
      // Atualize a lista de avaliações, removendo o comentário excluído
      setAvaliacoes(avaliacoes.filter((avaliacao) => avaliacao.id !== commentId));
  
      // Exiba uma mensagem de sucesso ou faça qualquer outra ação necessária
      alert('Comentário excluído com sucesso!')
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  }; 

  const handleDeleteReply = async (replyId) => {
    try {
      // Realize uma solicitação para excluir a resposta com base no replyId
      const url = `${process.env.REACT_APP_API_URL}/rating/${replyId}`;
      console.log(url);
      await axios.delete(url);
  
      // Atualize a lista de respostas, removendo a resposta excluída
      setReply(respostas.filter((resposta) => resposta._id !== replyId));
  
      // Exiba uma mensagem de sucesso ou faça qualquer outra ação necessária
      alert('Resposta excluída com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir resposta:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/locals/${id}`);
        const data = response.data;

        setNome(data.nome);
        setTipo(data.tipo);
        setSobre(data.sobre);
        setHorarios(data.horarios);
        setIngressos(data.ingressos);
        setEndereco(data.endereco);
        setFotoLocal(data.foto);
        setIframe(data.iframe)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/rating/${id}`);
        const avaliacoesData = response.data;
  
        // Função para buscar as informações do usuário
        const fetchUsuario = async (userId) => {
          const url = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${url}/user/${userId}`);
          return response.data;
        };
  
        // Array de promessas para buscar as informações dos usuários
        const fetchUsuarioPromises = avaliacoesData.map((avaliacao) => {
          return fetchUsuario(avaliacao.Users_id);
        });
  
        // Realiza múltiplas requisições ao mesmo tempo
        const usuariosData = await Promise.all(fetchUsuarioPromises);
  
        // Adiciona as informações do usuário em cada avaliação
        const avaliacoesComUsuario = avaliacoesData.map((avaliacao, index) => {
          return {
            ...avaliacao,
            usuario: usuariosData[index]
          };
        });
  
        setAvaliacoes(avaliacoesComUsuario);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchAvaliacoes();
  }, [id]);

  const fileInputRef = useRef(null);

  function convertToBase64(e) {
    const url = process.env.REACT_APP_API_URL;
    axios.post(`${url}/user/update-conquests/${userId}`, { "categoria": "Fotografar", "progresso": 1 })
    .then((response) => {
      console.log('Achievement "Fotografar" progress updated successfully.');
    })
    .catch((error) => {
      console.error('Error updating achievement progress:', error);
    });

    const file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = () => {
      //console.log(reader.result); //base64 string
      setFoto(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };

    reader.readAsDataURL(file);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // Verifique se o local está nos favoritos do usuário quando o componente for montado
    const fetchFavoritos = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          return;
        }

        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);
        const userData = response.data;

        // Verifique se o ID do local está nos favoritos do usuário
        setFavoritado(userData.favoritos.includes(id));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFavoritos();
  }, [id]);

  // Função para adicionar ou remover o local dos favoritos do usuário
  const toggleFavorito = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Você precisa estar logado para favoritar um local!');
        return;
      }

      const url = process.env.REACT_APP_API_URL;
      
      // Obtenha a lista de favoritos atual do usuário
      const response = await axios.get(`${url}/user/${userId}`);
      const userData = response.data;
      const favoritos = userData.favoritos || [];

      // Verifique se o ID do local já está nos favoritos
      const localIndex = favoritos.indexOf(id);

      if (localIndex !== -1) {
        // Se o local já estiver nos favoritos, remova-o
        favoritos.splice(localIndex, 1);
      } else {
        // Se o local não estiver nos favoritos, adicione-o
        favoritos.push(id);
      }

      // Atualize a lista de favoritos do usuário no servidor
      await axios.patch(`${url}/user/${userId}`, { favoritos })
      .then((response) => {
        // Após a primeira solicitação ser bem-sucedida, faça a segunda solicitação.
        axios.post(`${url}/user/update-conquests/${userId}`, { "categoria": "Favoritar", "progresso": 1 });
      });

      // Atualize o estado para refletir se o local está favoritado ou não
      setFavoritado(localIndex === -1);

      // alert(`Local ${localIndex === -1 ? 'adicionado aos' : 'removido dos'} favoritos com sucesso!`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function enviarReclamacao(reclamacao) {

    console.log("nome:? " + reclamacao.nome)
    console.log("titulo: " + reclamacao.titulo)
    console.log("descricao: " + reclamacao.descricao)
    console.log("local : " + reclamacao.local)

    const reclamacaoData = {
      nome: reclamacao.nome, // Use o nome do usuário que avaliou
      titulo: reclamacao.titulo,
      descricao: reclamacao.descricao, // Use o comentário da avaliação
      local: reclamacao.local, // Use o nome do local
    };

    const url = process.env.REACT_APP_API_URL;
    // Cria a estrutura JSON para a reclamação

    // Envia a reclamação para a rota de reclamações
    const urlReclamacoes = `${url}/complaints`; // Altere a URL conforme necessário
    axios
      .post(urlReclamacoes, reclamacaoData)
      .then((response) => {
        alert('Obrigado pela avaliação!');
        // Atualize o estado de avaliações se necessário
      })
      .catch((error) => {
        alert('Ocorreu um erro ao enviar sua avaliação. Por favor, tente novamente!');
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Você precisa estar logado para fazer uma avaliação!');
      return;
    }
  
    const novaAvaliacao = {
      nota: nota,
      comentario: comentario,
      tipo: 'tipo da avaliação',
      Locals_id: id,
      Users_id: userId,
      Comentario_Pai_Id: comentarioPaiId,
      foto: foto,
    };

    const reclamacaoData = {
      nome: nomeUsuario, // Use o nome do usuário que avaliou
      titulo: 'Reclamação',
      descricao: comentario, // Use o comentário da avaliação
      local: nome, // Use o nome do local
    };
  
    // Increment achievement progress for reviewing
    incrementAchievementProgress(userId);

    console.log("Nota: " + nota)

       // Verifica a classificação antes de enviar
       if (nota == '1' || nota == '2') {
        enviarReclamacao(reclamacaoData);
          enviarAvaliacao(novaAvaliacao);
      } else {
        console.log("else")
        enviarAvaliacao(novaAvaliacao);
      }
  
    setNota('');
    setComentario('');
    setComentarioPaiId('');
  }
  
  function incrementAchievementProgress(userId) {
    const url = process.env.REACT_APP_API_URL;
  
    axios
      .post(`${url}/user/update-conquests/${userId}`, { "categoria": "Avaliar", "progresso": 1 })
      .then((response) => {
        console.log('Achievement "Avaliar" progress updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating achievement progress:', error);
      });
  }
  
  function visitado() {
    const url = process.env.REACT_APP_API_URL;
  
    axios
      .post(`${url}/user/update-conquests/${userId}`, { "categoria": "Visitar", "progresso": 1 })
      .then((response) => {
        console.log('Achievement "Visitar" progress updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating achievement progress:', error);
      });
  }

  function enviarAvaliacao(novaAvaliacao) {
    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');
  
    // Verifica se o token está disponível
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }
  
    // Configura o cabeçalho com o token de autenticação
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    // Envia a requisição com o cabeçalho de autenticação
    const url = process.env.REACT_APP_API_URL;
    axios
      .post(`${url}/rating`, novaAvaliacao, { headers })
      .then((response) => {
        alert('Obrigado pela avaliação!')
        //window.location.reload();
        // Atualize o estado de avaliações se necessário
      })
      .catch((error) => {
        alert('Ocorreu um erro ao enviar sua avaliação. Por favor tenta novamente!')
      });
  }

  function filterReplies(avaliacoes) {
    return avaliacoes.filter(avaliacao => avaliacao.comentario_pai_id !== '');
  }
  const respostas = filterReplies(avaliacoes);

  const openForm = (avaliacaoId) => {
    setReplyTo(avaliacaoId);
  };

  const closeForm = () => {
    setReplyTo(null);
  };
  
  const handleReplyChange = (avaliacaoId, event) => {
    setReply((prevState) => ({
      ...prevState,
      [avaliacaoId]: event.target.value
    }));
  };

  const handleSubmitReply = (avaliacaoId, event) => {
    event.preventDefault();

      const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('Você precisa estar logado para fazer uma avaliação!');
         return;
        }
    
      const novaAvaliacao = {
        nota: '5',
        comentario: reply[avaliacaoId],
        tipo: 'resposta',
        Locals_id: id,
        Users_id: userId,
        Comentario_Pai_id: avaliacaoId, // Adicione o ID da avaliação pai
      };
        console.log(novaAvaliacao);
        enviarAvaliacao(novaAvaliacao);
      
        setNota('');
        closeForm(); // Fechar o formulário após enviar a resposta
  };

  const renderStars = (numberOfStars) => {
    const starFilled = <img className='icons_avaliacao' src={starIcon} alt='' />;
    const starEmpty = <img className='icons_avaliacao' src={emptyStarIcon} alt='' />;  

    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(starFilled);
    }
    for (let i = numberOfStars; i < 5; i++) {
      stars.push(starEmpty);
    }

    return (
      <p className='card_text' style={{ lineHeight: '25px', marginLeft: '50px', textAlign: 'start' }}>
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </p>
    );
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      setIsModalOpen(false);
    }
  };

  const handleMouseOver = (star) => {
    setHover(star);
  };
  const handleMouseLeave = () => {
    setHover(0);
  };
  const handleClick = (star) => {
    setNota(star);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const abrirImagem = (url) => {
    setImagemAmpliada(url);
  };

  const fecharImagem = () => {
    setImagemAmpliada(null);
  };


  
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div>
      <Header/>

      {isLoggedIn && !userFormTrue ? (<FormAnalytic />) : null}

        <div className='local_img'>
          <img src={fotoLocal} alt=''/>
          <div className='local_name'>
            {nome}
            <button
              className="favoritar_button"
              onClick={toggleFavorito}
            >
              <img src={favoritado ? starIcon : emptyStarIcon } className={favoritado ? "favoritar_button_on": "favoritar_button_off"} alt="Favoritar" />
            </button>
          </div>
        </div>
        <div>
          {/* <label>
            <input
              type="checkbox"
              onChange={visitado}
            />
            Marcar como visitado
          </label> */}
        </div>
      {/* ADICIONAR CARROSSEL DINAMICO*/}
      {/* <div className='div_name_container'>
        <div className='div_name_local'>
          <p className='ponto_name'>{nome}</p>
          <button
              className="favoritar-button"
              onClick={toggleFavorito}
            >
              {favoritado ? 'Remover dos Favoritos' : 'Favoritar'}
              <img src={emptyStarIcon} alt="Favoritar" />
            </button>
        </div>
      </div> */}
      <div className='infos_pontos_container'>
        <PontosTitle text={'Sobre o local'}/>
        <p className='ponto_infos_text'>
          {sobre}
        </p>
        <div className='infos_pontos_half'>
          <div className='info_block'>
            <PontosTitle text={'Horários'}/>
            <p className='ponto_infos_text'>
              {horarios}
            </p>
          </div>
          <div className='info_block'>
            <PontosTitle text={'Ingressos'}/>
            <p className='ponto_infos_text'>
              {ingressos}
            </p>
          </div>
        </div>

        <div className='infos_pontos_half'>
          <div className='info_block'>
            <PontosTitle text={'Como chegar'}/>
            <p className='ponto_infos_text'>
              {endereco}
              <iframe src={iframe} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </p>
          </div>
          <div className='info_block'>
            <PontosTitle text={'Galeria'}/>
            <p className='ponto_infos_text'>
              <ImageCarouselPontos/>
            </p>
          </div>
        </div>
        <br></br>
        <PontosTitle text={'Avaliações'}/>
        <button className="button_avaliacao" onClick={openModal}>
          Avaliar!
          </button>
        {isModalOpen && (




        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal_content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p className='avaliacao_name'>{nome}</p>
            <form onSubmit={handleSubmit}>
              <label style={{display: 'flex', justifyContent: 'center'}}>
                {[1, 2, 3, 4, 5].map((star) => {
                  return (
                    <span
                      key={star}
                      style={{ fontSize: '30px', color: (star <= (hover || nota)) ? '#FFD700' : '#C0C0C0', cursor: 'pointer'}}
                      onMouseOver={() => handleMouseOver(star)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(star)}
                    >
                      ★
                    </span>
                  );
                })}
              </label>
            <label>
              <div className="textbox_avaliacao">
                <textarea
                  value={comentario}
                  onChange={(event) => setComentario(event.target.value)}
                  required
                  placeholder='Escreva seu comentário...'
                />
              </div>
            </label>

            <label>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <button
                  className='image_avaliacao'
                  onClick={handleButtonClick}
                  type="button"
                >
                  Carregar Imagem
                </button>
              </div>
              {foto && (
              <div className="selected_image">
                <img src={foto} alt="Selected" />
              </div>
              )}
              <input
                type="file"
                accept='image/*'
                name="foto"
                id="foto"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={convertToBase64}
              />
            </label>
            <button type="submit" className='enviar_avaliacao'>Enviar</button>
            
          </form>
          </div>
        </div>
      )}

        <div className='container_comments'>
          <div className='container_card_comment'>
          {avaliacoes
        .filter((avaliacao) => avaliacao.Comentario_Pai_id === "")
        .map((avaliacao) => (
          <div className='card_comment'>
            <p className='card_comment_name card_text_av'>
              <div className='card_img_name'>
                <img className='icons_infos' src={userIcon} alt=''  style={{marginBottom: '-5px'}}/>
                <div className='card_comment_username'>{avaliacao.usuario.nome}</div>
              </div>
            {/* <div>
              <img src={avaliacao.foto} alt=''  style={{marginBottom: '-5px', width: '30px'}}/>
            </div> */}

            {isAdmin || avaliacao.usuario._id === localStorage.getItem('userId') ? (
              <button id='button_delete_av' title='Deletar' onClick={() => handleDeleteComment(avaliacao._id)}>
                <img className='delete_icon' src={deleteIcon} alt=''/>
              </button>
            ) : null}
            </p>
            {renderStars(parseInt(avaliacao.nota))}
            <p className='card_comment_text'>
              {avaliacao.comentario}
            </p>
            <div>
              <img src={avaliacao.foto} alt='' className='avaliacao_imagem' onClick={() => abrirImagem(avaliacao.foto)}/>
              {imagemAmpliada && (
                <div className='avaliacao_imagem_aberta_fundo' onClick={fecharImagem}>
                  <img src={imagemAmpliada} alt='' className='avaliacao_imagem_aberta' />
                </div>
              )}
            </div>
          <div>
          <br></br>
            <div style={{width: '100%', border: '1px solid #a3a3a3', marginBottom: '5px'}}></div>
            <div style={{width: '100%'}}>
              {replyTo === avaliacao._id ? (
                <form onSubmit={(event) => handleSubmitReply(avaliacao._id, event)}>
                  <textarea
                    value={reply[avaliacao._id]}
                    onChange={(event) => handleReplyChange(avaliacao._id, event)}
                    placeholder="Escreva sua resposta"
                  />
                  <button className='button_responder_av' type="submit">Enviar</button>
                  <button className='button_responder_av' onClick={closeForm}>Cancelar</button>
                </form>
              ) : (
                <button className='button_responder_av' onClick={() => openForm(avaliacao._id)}>Responder</button>
              )}
            </div>
          </div>
            <div>
            {respostas
            .filter((resposta) => resposta.Comentario_Pai_id === avaliacao._id)
            .map(resposta => (
              <div key={resposta._id} className="card_resposta">
                <div className='card_comment_name card_text_res'>
                  <div className='card_img_name'>
                    <img className='icons_resposta' src={userIcon} alt=''  style={{marginBottom: '-5px'}}/>
                    <div className='text_resposta_nome'> {resposta.usuario.nome} </div>
                    
                  </div>
                  {isAdmin || resposta.usuario._id === localStorage.getItem('userId') ? (
                    <button id='button_delete_av' title='Deletar' onClick={() => handleDeleteReply(resposta._id)}>
                      <img className='delete_icon' src={deleteIcon} alt='' />
                    </button>
                  ) : null}
                </div>
                <p className='text_resposta'>{resposta.comentario}</p>
              </div>
            ))}
            </div>
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Local;