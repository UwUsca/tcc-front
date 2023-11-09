import './RegisterLocal.css';
import axios from "axios"
import { useRef, useState } from "react"
import SmallHeader from './components/small_header';
import { useNavigate } from "react-router-dom";
import alertIcon from './imgs/circle-exclamation-solid.svg';
import arrow from './imgs/chevron-down-solid.svg';

function RegisterLocal() {

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
      .post(`${url}/locals`, { nome, slug, tipo, sobre, horarios, ingressos, endereco, foto, iframe }) //
      .then(response => {
        console.log(response)
        // alert("Local registrado com sucesso!");
        // Handle response
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert("Insira todos os campos");
        } else {
          console.error(error);
          // Handle other errors
        }
      });

      setEnvioFeito(true);
      setNome('');
      setSlug('');
      setTipo('');
      setSobre('');
      setHorarios('');
      setIngressos('');
      setEndereco('');
      setIframe('');
      setFoto('');
      setImagePreview(null)
      setTimeout(() => {
        setEnvioFeito(false);
    }, 2000);
  }

  const handleChangeNome = (event) => {
    const nomeValue = event.target.value;
    const slugValue = nomeValue.toLowerCase().replace(/\s/g, '-')
    setNome(nomeValue);
    setSlug(slugValue);
  }

  const fileInputRef = useRef(null);

  function cleanIframeString(string) {
    const regex = /<iframe.*src=["'](.*?)["']/;
    const match = regex.exec(string);
    const cleanedUrl = match ? match[1] : "";
    return cleanedUrl;
  }

  const handleIframeChange = (event) => {
    const cleanedUrl = cleanIframeString(event.target.value);
    setIframe(cleanedUrl);
  }

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

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setArrowRotated(!arrowRotated);
  };


  const [nome, setNome] = useState('')
  const [slug, setSlug] = useState('')
  const [tipo, setTipo] = useState('')
  const [sobre, setSobre] = useState('')
  const [horarios, setHorarios] = useState('')
  const [ingressos, setIngressos] = useState('')
  const [endereco, setEndereco] = useState('')
  const [iframe, setIframe] = useState('')
  const [foto, setFoto] = useState('')
  const [imagePreview, setImagePreview] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [arrowRotated, setArrowRotated] = useState(false);
  const [envioFeito, setEnvioFeito] = useState(false);
  //

  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verifica se o usuário é um administrador

  if (!isAdmin) {
    // Se o usuário não for um administrador, redirecionar para outra página
    navigate("/"); // Redireciona para a página inicial
    return null; // Evita a renderização da página atual
  }

  return (
    <div>
      <div className='div_register_local'>
        <div className='form_container_reg_local'>
        <h1 onClick={toggleFormVisibility}>CADASTRAR LOCAL <img style={{height: '25px', filter: 'invert(100%)'}} className={arrowRotated ? 'arrow_h1_rotated' : 'arrow_h1_rotated_off'} src={arrow}></img></h1>
        <form className={`form_reg_local ${formVisible ? 'form-hidden' : 'form-visible'}`} action="" method="post" onSubmit={handleSubmit}>

          <label for="nome">
          <p className="form_p_local"><a style={{color: '#ff4747'}}>* </a>Nome</p>
            <input
              className='form_input_local'
              type="nome"
              name="nome"
              id="nome"
              value={nome}
              onChange={handleChangeNome}
              required
            /></label>

          <label for="slug">
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Slug</p>
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

          <label for="tipo">
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Tipo</p>
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
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Sobre</p>
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
            <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Horários <img  title='Modelo:&#10;"(dia) à (dia), das xx:xx às xx:xx"&#10;ou&#10;"(dia) à (dia), Aberto 24 horas"'className="icon_alert_admin" src={alertIcon}/>
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
              <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Ingressos <img  title='Caso seja gratuito apenas "Entrada franca"'className="icon_alert_admin" src={alertIcon}/></p>
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
              <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Endereco</p>
            <input
              className='form_input_local'
              type="endereco"
              name="endereco"
              id="endereco"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              required
            /></label>

            <label for="iframe">
              <p className="form_p_local"><a style={{color: '#ff4747'}}>*</a> Iframe <img  title='Insira o iframe completo, ele será corrigido automáticamente'className="icon_alert_admin" src={alertIcon}/></p>
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
              <input className="form_submit_local" type="submit" value={envioFeito ? "Enviado" : "Enviar"} />
            </label>
        </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterLocal
