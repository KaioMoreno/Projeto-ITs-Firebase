import React from 'react'
import '../css/Login.css'
import '../css/responsive.css'
import {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import imagem from '../assets/imagemlogovix.jpg'
import { Slide,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loader/Loading.jsx'



const Login = () => {
    const [showLoading, setShowLoading] = useState(false);
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setShowLoading(true);
  
      try {
        const response = await axios.post('http://localhost:8080/login', { email, password });
  
        if (response.data.token) {
          login(response.data.token);
          Cookies.set('token', response.data.token, { expires: 1 });
          navigate('/admin/home');
        } else {
          toast.error('Usuário ou Senha Incorreto', {
            theme: "colored",
            autoClose: 1300,
          });
        }
      } catch (error) {
        toast.error('Ocorreu um erro durante o login. Tente novamente mais tarde.');
      } finally {
        setShowLoading(false);
      }
    };
  
    return (
        
      <div className='div-principal'>
        <ToastContainer />
        {showLoading && <Loading />}
        <div className='div-info-form'>
          <img className='logo-vix' src={imagem} alt='' />
          <h1 className='h1-login'>INSTRUÇÕES DE TRABALHO</h1>
        </div>
  
        <p className='p-info-login'>Digite seu e-mail e sua senha</p>
  

        <div className='div-form'>
          <form onSubmit={handleSubmit}>
  
            <div className='div-input-email'>
              <input className='input-email' type="text" name='email' placeholder='E-mail' autoComplete='on' required onChange={(e) => setEmail(e.target.value)} />
            </div>
  
            <div className='div-input-pass'>
              <input className='input-pass' type="password" name='password' placeholder='Senha' required autoComplete='off' onChange={(e) => setPassword(e.target.value)} />
            </div>
  
            <button className='btn-form'>LOGIN</button>
  
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  