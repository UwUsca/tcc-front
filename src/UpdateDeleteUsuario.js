import './App.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import arrow from './imgs/chevron-down-solid.svg';
import editIcon from './imgs/pen-solid.svg';
import deleteIcon from './imgs/xmark-solid.svg'
import copyIcon from './imgs/copy-solid.svg'
import checkIcon from './imgs/check-solid.svg'

import SmallHeader from './components/small_header';

function UpdateDeleteUsuario() {
  const navigate = useNavigate();

  const [users, setUser] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [adm, setAdm] = useState(Boolean)
  const [_id, setId]=useState(null) 
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState(''); 
  const [formUser, setFormUser] = useState(Boolean);
  const [arrowRotated, setArrowRotated] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [tableVisible, setTableVisible] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  //

  useEffect(() => {
    getUsers();
  }, [])

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/user`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setNome(resp[0].nome)
        setEmail(resp[0].email)
        setAdm(resp[0].adm)
        setId(resp[0]._id)
        setFormUser(resp[0].form)
        //
      })
    })
  }

  function deleteUser(_id) {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/user/${_id}`, {
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
        setEmail(item.email)
        setAdm(item.adm)
        setId(item._id)
        setIdade(item.idade);
        setSexo(item.sexo); 
        setFormUser(item.form)
        console.log(item)
  }

  function updateUser() {
    if (!nome || !email || adm === "" || !idade || !sexo) {
      // Verifica se algum campo obrigatório está vazio
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    let item = { nome, email, adm, idade, sexo }; // Inclua idade e sexo no objeto
    const url = process.env.REACT_APP_API_URL;
    console.warn("item", item);
    fetch(`${url}/user/${_id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUsers();
      })
    })
  }

  const toggleVisibility = () => {
    setFormVisible(!formVisible);
    setArrowRotated(!arrowRotated);
    setTableVisible(!tableVisible);
  };
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
      <h1 onClick={toggleVisibility}>GERENCIAR USUÁRIOS <img style={{height: '25px', filter: 'invert(100%)'}} className={arrowRotated ? 'arrow_h1_rotated' : 'arrow_h1_rotated_off'} src={arrow}></img></h1>
        <form className={`form_reg_local ${formVisible ? 'form-hidden' : 'form-visible'}`} action="" method="post">

            <label>
            <p className="form_p_local">Nome</p>
              <input
                className='form_input_local'
                type="text" 
                value={nome} 
                onChange={(e)=>{setNome(e.target.value)}} 
                required
              /></label>

            <label>
              <p className="form_p_local">Email</p>
              <input
                className='form_input_local'
                type="text" 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}} 
                required 
              /></label>

            <label>
              <p className="form_p_local">Adm</p>
            <select
              className='form_input_local'
              name="adm"
              id="adm"
              value={adm}
              onChange={e => setAdm(e.target.value)}
              required
            >
              <option style={{width: '85vw'}} value="">-Selecione-</option>
              <option style={{width: '85vw'}} value="0">Usuario</option>
              <option style={{width: '85vw'}} value="1">Administrador</option>
            </select></label>
            
            <label>
              <p className="form_p_local">Idade</p>
              <input
                className='form_input_local'
                type="text"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
              /></label>

            <label>
              <p className="form_p_local">Sexo</p>
              <input
                className='form_input_local'
                type="text"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
              /></label>
    
              <label style={{display: 'flex', alignItems: 'center'}}>
                <input className="form_submit_local" type="button" onClick={updateUser} value="Atualizar"/>
              </label>
        </form>




        <div className={`table_outer_container ${tableVisible ? 'table-hidden' : 'table-visible'}`} style={{ overflowX: 'auto' }}>
          <div className='table_container'>
            <table className='table_admin'>
            <thead>
              <tr>
                <td className='td_head_buttons' style={{textAlign: 'center'}}>Operations</td>
                <td>Nome</td>
                <td>Email</td>
                <td>Adm</td>
                <td>Idade</td>
                <td>Sexo</td>
                <td>Foto</td>
                <td style={{textAlign: 'center', width: '50px'}}>Form</td>
                <td style={{textAlign: 'center', width: '50px'}}>Indice</td>
                <td>ID</td>
              </tr>
            </thead>
            <tbody style={{ marginTop: '10px' }}>
              {users.map((item, i) => (
                <tr key={i}>
                  <td className='td_button' style={{textAlign: 'center'}}>
                    <button className="edit_button_table" onClick={() => selectUser(i)}>
                      <img src={editIcon} alt="Editar"></img>  
                    </button>
                    <button className='delete_button_table' onClick={() => deleteUser(item._id)}>
                      <img src={deleteIcon}></img>
                    </button>
                  </td>
                  <td className='td_name'>{item.nome}</td>
                  <td className='td_name'>{item.email}</td>
                  <td className='td_name'>{item.adm == true ? 'Administrador' : 'Usuário'}</td>
                  <td className='td_name'>{item.idade}</td>
                  <td className='td_name'>{item.sexo}</td>
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
                  <td style={{textAlign: 'center'}}>{item.form == true ? (
                    <img className='form_check_icon' style={{height: '30px', width: '30px'}}src={checkIcon}></img>
                  ) : (
                    <img className='form_x_icon' style={{height: '30px', width: '30px'}}src={deleteIcon}></img>
                  )}</td>
                  <td style={{textAlign: 'center'}}>{i}</td>
                  <td>{item._id}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateDeleteUsuario;