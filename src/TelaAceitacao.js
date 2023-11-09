import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import SmallHeader from './components/small_header';
import axios from 'axios';
import arrow from './imgs/chevron-down-solid.svg';
import editIcon from './imgs/pen-solid.svg';
import deleteIcon from './imgs/xmark-solid.svg'
import copyIcon from './imgs/copy-solid.svg'
import checkIcon from './imgs/check-solid.svg'
import acceptIcon from './imgs/check-solid.svg'


function TelaAceitacao() {
  const [users, setUser] = useState([])
  const [nome, setNome] = useState('')
  const [slug, setSlug] = useState('')
  const [tipo, setTipo] = useState('')
  const [sobre, setSobre] = useState('')
  const [horarios, setHorarios] = useState('')
  const [ingressos, setIngressos] = useState('')
  const [endereco, setEndereco] = useState('')
  const [foto, setFoto] = useState('')
  const [iframe, setIframe] = useState('')
  const [_id, setId]=useState(null) 
  const [arrowRotated, setArrowRotated] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [tableVisible, setTableVisible] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    getUsers();
  }, [])

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  }) 

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/localsAux`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setNome(resp[0].nome)
        setSlug(resp[0].slug)
        setTipo(resp[0].tipo)
        setSobre(resp[0].sobre)
        setHorarios(resp[0].horarios)
        setIngressos(resp[0].ingressos)
        setEndereco(resp[0].endereco)
        setFoto(resp[0].foto)
        setIframe(resp[0].iframe)
        setId(resp[0]._id)
      })
    })
  }

  function deleteUser(_id) {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/localsAux/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }

  function selectUser(i)
  {

    let item=users[i];
        setNome(item.nome)
        setSlug(item.slug)
        setTipo(item.tipo)
        setSobre(item.sobre)
        setHorarios(item.horarios)
        setIngressos(item.ingressos)
        setEndereco(item.endereco)
        setFoto(item.foto)
        setIframe(item.iframe)
        setId(item._id)
  }

  function aprovarLocalAuxiliar() {
    // Esta função não usa a variável 'e', então não é necessário defini-la
    // ...

    const url = process.env.REACT_APP_API_URL;
    getUsers();
    axiosInstance
      .post(`${url}/locals`, { nome, slug, tipo, sobre, horarios, ingressos, endereco, foto, iframe })
      .then(response => {
        console.log(response)
        alert("Local registrado com sucesso!");
        getUsers(); // Atualize a lista após o registro bem-sucedido

      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert("Insira todos os campos");
        } else {
          console.error(error);
        }
      });
  }
  



  const handleChangeNome = (event) => {
    const nomeValue = event.target.value;
    const slugValue = nomeValue.toLowerCase().replace(/\s/g, '-')
    setNome(nomeValue);
    setSlug(slugValue);
  }

  const fileInputRef = useRef(null);

  function convertToBase64(e) {
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

  function cleanIframeString(string) {
    const regex = /<iframe.*src=["'](.*?)["']/;
    const match = regex.exec(string);
    const cleanedUrl = match ? match[1] : "";
    return cleanedUrl;
  }

  const toggleVisibility = () => {
    setFormVisible(!formVisible);
    setArrowRotated(!arrowRotated);
    setTableVisible(!tableVisible);
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Image = e.target.result;
        setImagePreview(base64Image);
        setFoto(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  function updateUser()
  {
    let item={nome,slug,tipo,sobre,horarios,ingressos,endereco,foto,iframe}
    const url = process.env.REACT_APP_API_URL;
    console.warn("item",item)
    fetch(`${url}/locals/${_id}`, {
      method: 'PATCH',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }
  function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  
    const index = users.findIndex(item => item.iframe === text);
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], copied: true };
    setUser(updatedUsers);
  
    setTimeout(() => {
      const updatedUsers = [...users];
      updatedUsers[index] = { ...updatedUsers[index], copied: false };
      setUser(updatedUsers);
    }, 2000);
  
  }
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage('');
    setImageModalOpen(false);
  };

  return (
    <div className='div_register_local' style={{flexDirection: "column"}}>
      <div className='form_container_reg_local' style={{width: 'calc(100% - 40px)'}}>
      <h1 onClick={toggleVisibility}>LOCAIS SUGERIDOS<img style={{height: '25px', filter: 'invert(100%)'}} className={arrowRotated ? 'arrow_h1_rotated' : 'arrow_h1_rotated_off'} src={arrow}></img></h1>
        
        <form className={`form_reg_local form-hidden`} action="" method="post">

            <label>
            <p className="form_p_local">Nome</p>
              <input
                className='form_input_local'
                type="nome"
                name="nome"
                id="nome"
                value={nome}
                onChange={handleChangeNome}
                required
              /></label>

            <label>
              <p className="form_p_local">Slug</p>
              <input
                className='form_input_local'
                style={{cursor: 'text'}}
                disabled
                type="slug"
                name="slug"
                id="slug"
                value={slug}
                readOnly
              /></label>

            <label>
              <p className="form_p_local">Tipo</p>
            <select
              className='form_input_local'
              style={{cursor: 'pointer', height: '37px', width:'85vw'}}
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              required
            >
              <option style={{width: '85vw'}} value="">-Selecione Tipo-</option>
              <option style={{width: '85vw'}} value="ponto">Ponto</option>
              <option style={{width: '85vw'}} value="parque">Parque</option>
              <option style={{width: '85vw'}} value="shopping">Shopping</option>
            </select></label>
            
            <label for="sobre">
              <p className="form_p_local">Sobre</p>
            <textarea
              className='form_textarea_local'
              type="sobre"
              name="sobre"
              id="sobre"
              value={sobre}
              onChange={e => setSobre(e.target.value)}
              required
            /></label>

            <label for="horarios">
              <p className="form_p_local">Horários
              </p>
              <textarea
                className='form_textarea_local'
                type="horarios"
                name="horarios"
                id="horarios"
                value={horarios}
                onChange={e => setHorarios(e.target.value)}
                required
              /></label>

              <label for="ingressos">
                <p className="form_p_local">Ingressos</p>
              <textarea
                className='form_textarea_local'
                type="ingressos"
                name="ingressos"
                id="ingressos"
                value={ingressos}
                onChange={e => setIngressos(e.target.value)}
                required
              /></label>

              <label for="endereco">
                <p className="form_p_local">Endereco</p>
              <input
                className='form_input_local'
                type="text" 
                name="endereco"
                id="endereco"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
                required
              /></label>

              <label for="iframe">
                <p className="form_p_local">Iframe</p>
              <input
                className='form_input_local'
                type="iframe"
                name="iframe"
                id="iframe"
                value={iframe}
                onChange={e => setIframe(cleanIframeString(e.target.value))}
                required
              /></label>

              <label for="foto" className="custom-file-upload">
                <p className="form_p_local">Foto</p>
                <input
                  className='form_input_local'
                  type="file"
                  accept='image/*'
                  name="foto"
                  id="foto"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  required
                /></label>
              <div className="thumbnail">
                {imagePreview && <img src={imagePreview} alt="Thumbnail"/>}
              </div>
    
              <label style={{display: 'flex', alignItems: 'center'}}>
                <input className="form_submit_local" type="button" onClick={updateUser} value="Enviar"/>
              </label>
        </form>

        <div className={`table_outer_container ${tableVisible ? 'table-hidden' : 'table-visible'}`} style={{ overflowX: 'auto' }}>
          <div className='table_container'>
            <table className='table_admin'>
            <thead>
              <tr>
                <td className='td_head_buttons' style={{textAlign: 'center'}}>Operations</td>
                <td>Nome</td>
                <td>Slug</td>
                <td>Tipo</td>
                <td>Sobre</td>
                <td>Horarios</td>
                <td>Ingressos</td>
                <td>Endereco</td>
                <td>Foto</td>
                <td className='td_iframe'>Iframe</td>
                <td style={{textAlign: 'center', width: '50px'}}>Indice</td>
                <td>ID</td>
              </tr>
            </thead>
            <tbody style={{ marginTop: '10px' }}>
              {users.map((item, i) => (
                <tr key={i}>
                  <td className='td_button' style={{textAlign: 'center'}}>
                    <button className="edit_accept_table" onClick={() => aprovarLocalAuxiliar(i)}>
                    <img src={acceptIcon} alt="Accept Icon" /> 
                    </button>
                    <button className='delete_button_table' onClick={() => deleteUser(item._id)}>
                      <img src={deleteIcon}></img>
                    </button>
                  </td>
                  <td className='td_name'>{item.nome}</td>
                  <td className='td_name'>{item.slug}</td>
                  <td>{item.tipo}</td>
                  <td><div className='td_sobre'>{item.sobre}</div></td>
                  <td><div className='td_sobre'>{item.horarios}</div></td>
                  <td><div className='td_sobre'>{item.ingressos}</div></td>
                  <td><div className='td_sobre'>{item.endereco}</div></td>
                  <td>
                    {item.foto && <img onClick={() => openImageModal(item.foto)}src={item.foto} alt="Imagem" style={{ maxWidth: '100px', maxHeight: '50px', cursor:'pointer' }} />}
                    {imageModalOpen && (
                      <div className={`image-modal ${imageModalOpen ? 'modal-open' : 'modal-closed'}`}>
                        <div className="image-modal-content">
                          <span className="image-close" onClick={closeImageModal}>&times;</span>
                          <img src={selectedImage} alt="Imagem ampliada" />
                        </div>
                      </div>
                    )}  
                  </td>
                  <td className='td_iframe'>
                    <button onClick={() => copyToClipboard(item.iframe)}>
                      {item.copied ? (<img src={checkIcon}></img>) : (<img src={copyIcon}></img>)}
                    </button>
                  </td>
                  <td style={{textAlign: 'center'}}>{i}</td>
                  <td>{item._id}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div> 
      {/* <SmallHeader/>
      <h1 className='card_text'> Aceite Locais sugeridos </h1>
      <div className='container_update_table'>
        <div className='colored_background_opacity container_selector_admin'>
          <label>
            <span>Nome</span><br></br>
            <input
                type="nome"
                name="nome"
                id="nome"
                value={nome}
                onChange={handleChangeNome}
                required
              /></label>
          <label>
            <span>Slug</span><br></br>
            <input
                style={{cursor: 'text', color: 'white'}}
                disabled
                type="slug"
                name="slug"
                id="slug"
                value={slug}
                readOnly
              /> 
          </label>
          <label>
            <span>Tipo</span><br></br>
            <select
                style={{cursor: 'pointer'}}
                name="tipo"
                id="tipo"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                required
              >
                <option value="">-Selecione Tipo-</option>
                <option value="ponto">Ponto</option>
                <option value="parque">Parque</option>
                <option value="shopping">Shopping</option>
            </select>
          </label>
          <label>
                <span>Foto (base64)</span><br />
                <textarea
                type="foto"
                name="foto"
                id="foto"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                required
                />
         </label>
          <label>
            <span>Sobre</span><br></br>
            <textarea
                type="sobre"
                name="sobre"
                id="sobre"
                value={sobre}
                onChange={e => setSobre(e.target.value)}
                required
              />
          </label>
          <label>
            <span >Horários</span> <br></br>
            <textarea
                type="horarios"
                name="horarios"
                id="horarios"
                value={horarios}
                onChange={e => setHorarios(e.target.value)}
                required
              />
          </label>
          <label>
            <span>Ingressos</span><br></br>
            <textarea
                type="ingressos"
                name="ingressos"
                id="ingressos"
                value={ingressos}
                onChange={e => setIngressos(e.target.value)}
                required
              />
          </label>
          <label>
            <span>Endereços</span><br></br>
            <textarea 
              type="text" 
              name="endereco"
              id="endereco"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Iframe</span>
            <input 
              type="iframe"
              name="iframe"
              id="iframe"
              value={iframe}
              onChange={e => setIframe(cleanIframeString(e.target.value))}
              required
            /> 
          </label>
          <div style={{width: '100%', textAlign: 'center'}}>
            <button className='att_local btn_submit' onClick={aprovarLocalAuxiliar} >Aceitar Local</button>  
          </div>
        </div>
        <div className='table_container'>
          <table className='table_admin'>
            <thead>
              <tr>
                <td colSpan={2} className='td_head_buttons'>Operations</td>
                <td>Nome</td>
                <td>Slug</td>
                <td>Tipo</td>
                <td>Sobre</td>
                <td>Horarios</td>
                <td>Ingressos</td>
                <td>Endereco</td>
                <td>Foto</td>
                <td>Iframe</td>
                <td>Indice</td>
                <td>ID</td>
              </tr>
            </thead>
            <tbody style={{marginTop: '10px'}}>
              {
                users.map((item, i) =>
                
                  <tr key={i}>
                    <td className='td_button'><button className='att_local btn_submit' onClick={() => deleteUser(item._id)}>Delete</button></td>
                    <td className='td_button'><button className='att_local btn_submit ' onClick={() => selectUser(i)}>Select</button></td>
                    <td className='td_name'>{item.nome}</td>
                    <td className='td_name'>{item.slug}</td>
                    <td>{item.tipo}</td>
                    <td><div className='td_sobre'>{item.sobre}</div></td>
                    <td><div className='td_sobre'>{item.horarios}</div></td>
                    <td><div className='td_sobre'>{item.ingressos}</div></td>
                    <td><div className='td_sobre'>{item.endereco}</div></td>
                    <td><div className='td_sobre td_break'>{item.foto}</div></td>
                    <td><div className='td_sobre td_break'>{item.iframe}</div></td>
                    <td>{i}</td>
                    <td>{item._id}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div> */}
      
      
    </div>
  );
}
export default TelaAceitacao;