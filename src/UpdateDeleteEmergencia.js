import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import arrow from './imgs/chevron-down-solid.svg';
import editIcon from './imgs/pen-solid.svg';
import deleteIcon from './imgs/xmark-solid.svg'
import copyIcon from './imgs/copy-solid.svg'
import checkIcon from './imgs/check-solid.svg'
import SmallHeader from './components/small_header';


function UpdateDeleteEmergencia() {
  const [users, setUser] = useState([])
  const [nome, setNome] = useState('')
  const [logo, setlogo] = useState('')
  const [numero, setnumero] = useState('')
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

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/emergency`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setNome(resp[0].nome)
        setlogo(resp[0].logo)
        setnumero(resp[0].numero)
        setId(resp[0]._id)
      })
    })
  }

  function deleteUser(_id) {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/emergency/${_id}`, {
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
        setlogo(item.logo)
        setnumero(item.numero)
        setId(item._id)
  }

  function updateUser()
  {
    let item={nome,logo,numero}
    const url = process.env.REACT_APP_API_URL;
    console.warn("item",item)
    fetch(`${url}/emergency/${_id}`, {
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

  const fileInputRef = useRef(null);

  function convertToBase64(e) {
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result); //base64 string
      setlogo(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };

    reader.readAsDataURL(file);
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
        setlogo(base64Image);
      };
      reader.readAsDataURL(file);
    }
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
      <h1 onClick={toggleVisibility}>GERENCIAR EMERGÊNCIAS <img style={{height: '25px', filter: 'invert(100%)'}} className={arrowRotated ? 'arrow_h1_rotated' : 'arrow_h1_rotated_off'} src={arrow}></img></h1>
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

            <label>
              <p className="form_p_local">Número</p>
              <input
                className='form_input_local'
                type="number" 
                value={numero} 
                max={999}
                onChange={(e)=>{setnumero(e.target.value)}}
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
                <td>Logo</td>
                <td>Número</td>
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
                  <td>
                    {item.logo && <img onClick={() => openImageModal(item.logo)}src={item.logo} alt="Imagem" style={{ maxWidth: '100px', maxHeight: '50px', cursor:'pointer' }} />}
                    {imageModalOpen && (
                      <div className={`image-modal ${imageModalOpen ? 'modal-open' : 'modal-closed'}`}>
                        <div className="image-modal-content">
                          <span className="image-close" onClick={closeImageModal}>&times;</span>
                          <img src={selectedImage} alt="Imagem ampliada" />
                        </div>
                      </div>
                    )}  
                  </td>
                  <td className='td_name'>{item.numero}</td>
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
      <h1 className='card_text'>Update e Delete - Emergencia </h1>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center',justifyContent: 'center', flexDirection: 'row'}}>
        <div className='colored_background_opacity container_selector_admin'>
          <label>
            <span>Nome</span>
            <input 
            type="text" 
            value={nome} 
            onChange={(e)=>{setNome(e.target.value)}} 
            required
            /> 
          </label>
          <label>
            <span>Foto</span>
            <input 
              type="file"
              accept='image/*'
              name="foto"
              id="foto"
              ref={fileInputRef}
              style={{border: 'none', color: 'white'}}
              onChange={convertToBase64}
              required
            /> 
          </label>
          <label>
            <span>Número</span>
            <input 
            type="number" 
            value={numero} 
            max={999}
            onChange={(e)=>{setnumero(e.target.value)}} /> 
          </label>
          <div style={{width: '100%', textAlign: 'center'}}>
            <button className='att_local btn_submit' onClick={updateUser} >Atualizar</button>  
          </div>
        </div>
        <div style={{width: '100%', height: '500px', overflowX: 'scroll', overflowY: 'scroll'}}>
        <table className='table_admin'>
          <thead>
            <tr>
              <td colSpan={2}>Operations</td>
              <td>Nome</td>
              <td>Indice</td>
              <td>ID</td>
              <td>logo</td>
              <td>numero</td>
            </tr>
          </thead>
          <tbody style={{marginTop: '10px'}}> 
            {
              users.map((item, i) =>
              
                <tr key={i}>
                  <td><button className='att_local btn_submit' onClick={() => deleteUser(item._id)}>Delete</button></td>
                  <td><button className='att_local btn_submit' onClick={() => selectUser(i)}>Select</button></td>
                  <td style={{padding: '0 15px'}}>{item.nome}</td>
                  <td style={{padding: '0 15px'}}>{i}</td>
                  <td style={{padding: '0 15px'}}>{item._id}</td>
                  <td style={{padding: '0 15px'}}><div className='td_sobre td_break'>{item.logo}</div></td>
                  <td style={{padding: '0 15px'}}>{item.numero}</td>
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
export default UpdateDeleteEmergencia;

