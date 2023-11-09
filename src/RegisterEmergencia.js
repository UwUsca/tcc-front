// import './App.css';
import axios from "axios"
import { useState, useRef } from "react"
import SmallHeader from './components/small_header';
import { useNavigate } from "react-router-dom";
import alertIcon from './imgs/circle-exclamation-solid.svg';
import arrow from './imgs/chevron-down-solid.svg';

function RegisterEmergencia() {

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  }) 

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations 
    const url = process.env.REACT_APP_API_URL;
    axiosInstance
      .post(`${url}/emergency`, { nome, logo, numero})
      .then(response => {
        console.log(response)
        alert("Dados de emergencia registrados com sucesso!");
        // Handle response
      })
  }

  const fileInputRef = useRef(null);

  function convertToBase64(e) {
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = () => {
      //console.log(reader.result); //base64 string
      setlogo(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };

    reader.readAsDataURL(file);
  }

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

  const [nome, setNome] = useState('')
  const [logo, setlogo] = useState('')
  const [numero, setnumero] = useState('')
  const [imagePreview, setImagePreview] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [arrowRotated, setArrowRotated] = useState(false);
  const [envioFeito, setEnvioFeito] = useState(false);


  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setArrowRotated(!arrowRotated);
    
  };

  return (
      <div className='div_register_local'>
        <div className='form_container_reg_local' style={{width: '100%'}}>
        <h1 onClick={toggleFormVisibility}>CADASTRAR EMERGÊNCIA <img style={{height: '25px', filter: 'invert(100%)'}} className={arrowRotated ? 'arrow_h1_rotated' : 'arrow_h1_rotated_off'} src={arrow}></img></h1>
        <form className={`form_reg_local ${formVisible ? 'form-hidden' : 'form-visible'}`} action="" method="post" onSubmit={handleSubmit}>

          <label for="nome">
          <p className="form_p_local"><a style={{color: '#ff4747'}}>* </a>Nome</p>
            <input
              className='form_input_local'
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            /></label>

          <label for="numero">
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Número</p>
            <input
              className='form_input_local'
              name="numero"
              id="numero"
              value={numero}
              onChange={e => setnumero(e.target.value)}
              required
            /></label>

            <label for="foto" className="custom-file-upload">
              <p className="form_p_local"><a style={{ color: '#ff4747' }}>*</a> Foto<img title='Tamanho max: 80kb' className="icon_alert_admin" src={alertIcon} /></p>
              <input
                className='form_input_local'
                type="file"
                accept='image/*'
                name="foto"
                id="foto"
                onChange={handleFileSelect}
                required
              /></label>
            <div className="thumbnail">
              {imagePreview && <img src={imagePreview} alt="Thumbnail"/>}
            </div>

            <label style={{display: 'flex', alignItems: 'center'}}>
              <input className="form_submit_local" type="submit" value={envioFeito ? "Registrado" : "Registrar"} />
            </label>
        </form>
        </div>
      </div>
  )
}

export default RegisterEmergencia

