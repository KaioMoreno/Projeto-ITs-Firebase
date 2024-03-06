import React, { useState, useEffect } from 'react'
import '../css/Home.css'
import '../css/responsive.css'
import imagem from '../assets/imagemlogovix.jpg'
import iconeChamadaEmergencia from '../assets/icon-chamada-emergencia-branco.png'
import { Outlet, Link, useNavigate } from 'react-router-dom'


const Home = () => {


    const navigate = useNavigate();

    const handleClickChamadaEmergencia = async () => {
        navigate('/chamadaemergencia')
    }

    return (
        
        <div className='div-principal-its'>

        <Outlet/>

            <div className='div-conteudo'>

                <img className='img-logo-vix' src={imagem} alt="foto da logo da vix" />

                <div className='div-conteudo-apr'>
                    <Link className='link-apr' to='/Apr'>APRs</Link>
                </div>

                <h1 className='h1-principal'>Instrução de Trabalho</h1>
               
                <p className='p-principal'>Selecione a opção desejada</p>

               <div className='div-setores'>

                    <div className='div-conteudo'>
                        <Link className='link-sections' to='/Rotograma'>ROTOGRAMA</Link>
                    </div>
                    <div className='div-conteudo'>
                        <Link className='link-sections' to='/Triagem'>TRIAGEM</Link>
                    </div>

                    <div className='div-conteudo'>
                        <Link className='link-sections' to='/Suprimentos'>SUPRIMENTOS</Link>
                    </div>

                    <div className='div-conteudo'>
                        <Link className='link-sections' to='/PreparacaodeCargas'>PREPARAÇÃO DE CARGAS</Link>
                    </div>

                    <div className='div-conteudo'>
                        <Link className='link-sections' to='/Manutencao'>MANUTENÇÃO</Link>
                    </div>

                    <div className='div-conteudo'>
                        <Link className='link-sections' to='/Froteq'>FROTEQ</Link>
                    </div>

                    <div className='div-conteudo'>
                        <Link className='link-sections' to='/ArmMacae'>ARM MACAÉ</Link>
                    </div>
                    
               </div>

               <div className='div-icon-chamadaemergencia' onClick={() => handleClickChamadaEmergencia()}>
                    <img className='icon-chamada-emergencia' src={iconeChamadaEmergencia} alt="https://icons8.com.br/icon/96289/chamar-masculino" />
                    <p className='p-icon-chamadaemergencia'>Emergência</p>
               </div>


            </div>
            
        </div>
        
    )
}

export default Home;