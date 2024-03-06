import React, { useState, useEffect } from 'react'
import '../css/AdminHome.css'
import '../css/responsive.css'
import iconeadd from '../assets/iconadd.png'
import iconexcluir from '../assets/iconexcluir.png'
import imagem from '../assets/imagemlogovix.jpg'
import axios from 'axios'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Slide,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loader/Loading.jsx'
import iconadd from '../assets/icon-adicionar.png'



const AdminHome = () => {

  const enableScroll = () => {
    document.body.style.overflow = 'visible';
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };


    const [nome, setNome] = useState('');
    const [addFiles, setAddFiles] = useState([]);
    const [modalAddDocuments, setmodalAddDocuments] = useState(false)
    const [Loader, setLoader] = useState(false);
    const [modalForm, setModalForm] = useState(false)
    const [openFolder, setOpenFolder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [folders, setFolders] = useState({});
    const [nomeArquivo, setNomeArquivo] = useState('')
    const [files, setFiles] = useState(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedSetor, setSelectorSetor] = useState(null)
    const [setorSelectedBtn, setSetorSelectedBtn] = useState(null)
    const [showDocuments, setShowDocuments] = useState(false)

    const navigate = useNavigate()

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setShowConfirmModal(true)

  };

  const handleConfirm = async () => {

    const storedToken = Cookies.get('token');

    try {
      if (!nomeArquivo) {
        toast.error('Digite um nome para a pasta!', {
          theme: "colored",
          autoClose: 1500,
        });
      } else if (!files) {
        toast.error('Você deve escolher algum arquivo!', {
          theme: "colored",
          autoClose: 1500,
        });
      } else {
        const formData = new FormData();
        formData.append('setor', setorSelectedBtn);
        formData.append('nomeArquivo', nomeArquivo.toUpperCase());
  
        try {
          for (let i = 0; i < files.length; i++) {
            formData.append(`files`, files[i]);
          }
          
          disableScroll();
          setLoader(true);

          if(storedToken) {
            const response = await axios.post('URL/admin/home', formData, {
              headers: {
                Authorization: `Bearer ${storedToken}`
              },
            });
  
            setTimeout(() => {
              window.location.reload();
            }, 1500);
            toast.success('Documento criado com sucesso!', {
              theme: "colored",
              autoClose: 1300,
            });
          }
          
        } catch (error) {
          toast.error('Ocorreu um erro, tente novamente mais tarde!', {
            theme: "colored",
            autoClose: 1300,
          })
        }
      }
    } catch (err) {
      toast.error('Ocorreu um erro, tente novamente mais tarde!', {
        theme: "colored",
        autoClose: 1300,
      });
    } finally {
      setShowConfirmModal(false);
      setLoader(false);
      enableScroll();
    }
  };

  const deleteSetores = async (setor, nome) => {

    const storedToken = Cookies.get('token');
    
    setLoader(true);
    disableScroll();

    try {
    
      if(storedToken) {
        const response = await axios.delete(`URL/admin/home/${setor}/${nome}`, {
        headers: {
              Authorization: `Bearer ${storedToken}`
            },
      });
      
      setLoader(false)
      enableScroll()
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      toast.success('Documento deletado com sucesso!', {
        theme:"colored",
        autoClose: 1300,
        });

      }

    } catch(error) {
      toast.error('Ocorreu um erro, tente novamente mais tarde!', {
        theme:"colored",
        autoClose: 1300,
      });
    }
  }
  
  const fetchSetores = async (rota) => {
    try {
      const storedToken = Cookies.get('token');
  
      if (storedToken) {
        const response = await axios.get(`URL/${rota}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
  
        setFolders(response.data);
      } else {
          navigate('/admin')
      }
    } catch (error) {
      toast.error('Ocorreu um erro, tente novamente mais tarde!', {
        theme:"colored",
        autoClose: 1300,
      });
    }
  };

    const addDocuments = async (setor) => {
      
      try {
        
        setLoader(true);
        const storedToken = Cookies.get('token');
        

        if (storedToken) {
          const formData = new FormData();
          formData.append('nome', nome);
    
          if (addFiles && addFiles.length) {
            for (let i = 0; i < addFiles.length; i++) {
              formData.append(`files`, addFiles[i]);
            }
          }
        

          const response = await axios.post(`URL/admin/home/add/${selectedSetor}/${nome.toUpperCase()}`, formData, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          setLoader(false)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
          toast.success('Documento adicionado com sucesso!', {
            theme:"colored",
            autoClose: 1300,
            });
        }
      } catch (err) {
        console.error(err);
      }
    };

  
    useEffect(() => {
      fetchSetores('Triagem');
    }, []);


    const handleCancel = () => {
      setShowConfirmModal(false)
    }
  
    const handleClickForm = () => {
      setModalForm(true)
    }
  
    const closeModalForm = () => {
      setModalForm(false)
    }

    const handleClick = (setor) => {
        fetchSetores(setor);
        setOpenFolder((prevState) => (prevState === setor ? null : setor));
        setModalOpen(true);
        setSelectorSetor(setor)
        setSetorSelectedBtn(setor)
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    const handleClickShowImagens = (folderSetor) => {
      setShowDocuments(true);
      setSelectorSetor(folderSetor);
    };
  
    const clickModalAddDocuments = () => {
      setmodalAddDocuments(true)
    }

    const closeModalAddDocuments = () => {
      setmodalAddDocuments(false)
    }

    
    return (
      <> 

        <div className='conteudo-admin-home'>
            <ToastContainer/>
            
            <div className='div-logo-admin'>
              <img className='logo-vix-icon' src={imagem} alt='' />
            </div>
      
            <div className='div-info-admin'>
              <h1 className='h1-admin'>MENU</h1>
            </div>
      
            <p className='p-text'>Selecione o setor onde deseja editar</p>
      
            <div className='div-setores-admin'>
              <div className='div-setores-buttons'>
                <div className='div-setor'>
                  <button className='button-setores' onClick={() => handleClick('Triagem')}>
                    TRIAGEM
                  </button>

                  {modalOpen && (
                    <div className='modal-admin'>
                      <div className='div-content-infos'>
                        <div className='info-admin-card'>
                          <img className='iconadd-img' src={iconeadd} alt='' />
                          <button className='btn-criar-documento' onClick={() => handleClickForm()}>CRIAR DOCUMENTO</button>

                        </div>
      
                        <div className='modal-setores'>
                          <span className={`close-admin ${modalForm ? 'hidden' : ''}`  } onClick={closeModal}>
                            &times;
                          </span>
      
                          {Object.keys(folders).map((folderSetor) => (
                            <div className='edit-setores' key={folderSetor}>
                              <button className='btn-setor' onClick={() => handleClickShowImagens(folderSetor)}>
                                {folderSetor}
                              </button>
                              <div className='icone-container'>
                                <img
                                  className='iconecluir-img'
                                  src={iconexcluir}
                                  alt=''
                                  onClick={() => deleteSetores(selectedSetor, folderSetor)}
                                />
                                <div className='legenda-iconeexcluir'>DELETAR</div>

                              </div>
                              <div className='icon-add-container'>
                                <img className='icon-add-document' src={iconadd} alt="" onClick={() => clickModalAddDocuments()}/>

                                <div className='legenda-icon-add'>ADICIONAR</div>
                              </div>

                              {modalAddDocuments && (
                                <div className='modal-add-documents'>
                                  <div className='modal-content-adddocuments'>

                                    <div className='div-info-modal'>
                                      <img className='logo-vix' src={imagem} alt='' />
                                      <p className='p-info-modal'>Selecione os documentos que deseja adicionar nesta pasta</p>
                                    </div>

                                    <form onSubmit={(e) => { e.preventDefault(); addDocuments(); }}>

                                      <div className='div-input-nomeArquivo'>
                                        <input className='input-nomearquivo' name='nome' type="text" placeholder='Nome da Pasta' onChange={(e) => setNome(e.target.value)}/>
                                      </div>

                                      <div className='div-input-files'>
                                        <input className='input-files' type="file" name='files' accept='.jpg, .jpeg' multiple onChange={(e) => setAddFiles(e.target.files)}/>
                                      </div>

                                      <div className='div-adicionar-documentos'>
                                       <button type="submit" className='btn-adicionar-documentos'>ADICIONAR</button>
                                      </div>

                                    </form>

                                  </div>

                                  <span className='admin-close' onClick={closeModalAddDocuments}>
                                      &times;
                                  </span>

                                </div>
                              )}

                              {showDocuments && selectedSetor === folderSetor && (
                                <div className='admin-modal'>
                                  <div className='admin-modal-content'>
                                    <span className='admin-close' onClick={closeModal}>
                                      &times;
                                    </span>
                                    {folders[folderSetor].map(file => (
                                      <div key={file.nome} className='div-imagens-aprs'>
                                        <img className='admin-imagens'src={file.url} alt={file.nome} />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                { modalForm && (

                    <div className='modal-create-files'>
                      
                      <div className='modal-form'>

                        <div className='div-info-modal'>
                          <img className='logo-vix' src={imagem} alt='' />
                          <p className='p-info-modal'>Selecione o setor onde deseja criar os documentos e escolha um nome</p>
                        </div>
                      

                        <form onSubmit={handleSubmitForm}>

                          <div className='div-input-nomeArquivo'>
                            <input className='input-nomearquivo' name='nomeArquivo' type="text" placeholder='Nome da Pasta' onChange={(e) => setNomeArquivo(e.target.value)}/>
                          </div>

                          <div className='div-input-files'>
                            <input className='input-files' type="file" name='files' accept='.jpg, .jpeg' multiple onChange={(e) => setFiles(e.target.files)}/>
                          </div>
                            
                          <div className='div-criar-documento'>
                            <button className='btn-criar-pasta' onClick={handleSubmitForm}>CRIAR</button>  
                          </div>  
                        
                        </form>

                      </div>
                      
                        <span className='close-form-files' onClick={closeModalForm}>&times;</span>

                    </div>
                  )}

                  {showConfirmModal && (

                    <div className='div-confirm-modal'>

                        <div className='conteudo-modal-confirm'>

                          <p className='p-confirm-modal'>Deseja confirmar essa edição?</p>
                          <button className='btn-confirmar' onClick={handleConfirm}>CONFIRMAR</button>
                          <button className='btn-cancel' onClick={handleCancel}>CANCELAR</button>

                        </div>

                    </div>
                    
                  )}

                {Loader && <Loading />} 
      
                <div className='div-setor'>
                  <button className='button-setores' onClick={() => handleClick('Rotograma')}>ROTOGRAMA</button>
                </div>

                <div className='div-setor'>
                  <button className='button-setores' onClick={() => handleClick('Suprimentos')}>SUPRIMENTOS</button>
                </div>
                
                <div className='div-setor'>
                    <button className='button-setores' onClick={() => handleClick('PreparacaodeCargas')}>PREPARAÇÃO DE CARGAS</button>
                </div>
                                          
                <div className='div-setor'>
                    <button className='button-setores' onClick={() => handleClick('Manutencao')}>MANUTENÇÃO</button>
                </div>   

                <div className='div-setor'>
                    <button className='button-setores' onClick={() => handleClick('Froteq')}>FROTEQ</button>
                </div>                   
                        
                <div className='div-setor'>
                    <button className='button-setores' onClick={() => handleClick('ArmMacae')}>ARM MACAÉ</button>
                </div>

                <div className='div-setor'>
                    <button className='button-setores' onClick={() => handleClick('Apr')}>APRs</button>
                </div>

              </div>

            </div>
        </div>
    </>

    );

  };
  
  export default AdminHome;