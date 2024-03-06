import react from 'react'
import '../css/Setores.css'
import '../css/responsive.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagem from '../assets/imagemlogovix.jpg'
import { Slide,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'



const FileExplorer = () => {

    const [openFolder, setOpenFolder] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [folders, setFolders] = useState({});
  
    useEffect(() => {
      fetchSetores();
    }, []);
  
    const fetchSetores = async () => {
      try {
        const response = await axios.get('https://backend-its-vix-6ctnlxpfjq-uc.a.run.app/Suprimentos');
        setFolders(response.data);
      } catch (error) {
        toast.error('Ocorreu um erro, tente novamente mais tarde!', {
          theme: "colored",
          autoClose: 1300,
        })
      }
      
    };
  
    const handleClick = (setor) => {
      setOpenFolder((prevState) => (prevState === setor ? null : setor)); // Operação Ternaria
      setModalOpen(true)
    };

    const closeModal = () => {
      setModalOpen(false)
    }

    return (
      <div className='div-conteudo-principal-setor'>

        <div>
          <Link className='link-apr' to='/'>VOLTAR</Link>
        </div>

        <div className='div-conteudo-info'>
          <img className='img-logo-vix' src={imagem} alt="foto da logo da vix" />
          <h1 className='h1-principal'>Instrução de Trabalho</h1>
          <p className='p-principal'>Selecione a opção desejada</p>
        </div>
  
        <div className='div-conteudo-its'>
          {Object.keys(folders).map((setor) => (
            <div key={setor} className='div-nome-pastas'>
              <button className='button-pasta' onClick={() => handleClick(setor)}>
                {setor}
              </button>

              {openFolder === setor && modalOpen && (
                <div className='modal'>
                  <div className='modal-content'>
                    <span className='close' onClick={closeModal}>
                      &times;
                    </span>
                    {Object.keys(folders).map(folder => (
                      <div key={folder} className='div-imagens-aprs'>
                        {folders[folder].map(file => (
                          <img className='imagens' key={file.nome} src={file.url} alt={file.nome}/>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

const Triagem = () => {
  return (
    <div>
      <FileExplorer />
    </div>
  );
};

export default Triagem;