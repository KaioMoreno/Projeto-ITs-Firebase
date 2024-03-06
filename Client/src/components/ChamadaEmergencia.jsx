import imagem from '../assets/imagemlogovix.jpg'
import '../css/responsive.css'
import '../css/ChamadaEmergencia.css'
import { Outlet, Link, useNavigate } from 'react-router-dom'



const ChamadaEmergencia = () => {

    return (
        
        <div>
          <div className='div-btn-voltar'>
            <Link className='link-apr' to='/'>VOLTAR</Link>
          </div>
      
          <table>
            <tbody>
              <tr>
                <th>ORGÃOS DE APOIO</th>
                <th>TELEFONE</th>
              </tr>
              <tr>
                <td>Corpo de Bombeiros - RJ</td>
                <td>Macaé<a href="tel:+552227916852"> (22) 2791-6852</a> / Nacional - <a href="tel:193">193</a></td>
              </tr>
              <tr>
                <td>SAMU</td>
                <td><a href="tel:192">192</a></td>
              </tr>
              <tr>
                <td>Defesa Civil</td>
                <td> Macaé <a href="tel:+552227574056">(22) 2757-4056 </a> / Nacional - <a href="tel:199"> 199</a></td>
              </tr>
              <tr>
                <td>INEA - Instituto Estadual do Ambiente</td>
                <td><a href="tel:+552227655303">(22) 2765-5303</a> / <a href="tel:+552227657379">(22) 2765-7379</a></td>
              </tr>
              <tr>
                <td>Scretaria De Mobilidade Urbana</td>
                <td><a href="tel:+552227652963">(22) 2765-2963</a></td>
              </tr>
              <tr>
                <td>ENEL</td>
                <td><a href="tel:0800280120">0800 280 120</a> / <a href="tel:+552227725055">(22) 2772-5055</a></td>
              </tr>
              <tr>
                <td>IBAMA - RJ</td>
                <td><a href="tel:+552130774254">(21) 3077-4254</a> / <a href="tel:08000618080">0800 061 8080</a></td>
              </tr>
              <tr>
                <td>Prefeitura Macaé</td>
                <td><a href="tel:+552227919008">(22) 2791-9008</a> / Fax: <a href="tel:+552227629653">(22) 2762-9653</a></td>
              </tr>
              <tr>
                <td>Prefeitura de Rio das Ostras</td>
                <td><a href="tel:+552227711515">(22) 2771-1515</a> / Fax: <a href="tel:+552227716381">(22) 2771-6381</a></td>
              </tr>
              <tr>
                <td>Policia Militar - RJ</td>
                <td><a href="tel:+552227723190">(22) 2772-3190</a> / <a href="tel:190">Nacional 190</a></td>
              </tr>
              <tr>
                <td>Policia Civil</td>
                <td><a href="tel:197">Nacional 197</a></td>
              </tr>
              <tr>
                <td>Policia Rodoviaria Federal</td>
                <td><a href="tel:+552227968300">(22) 2796-8300</a> / <a href="tel:191">Nacional 191</a></td>
              </tr>
              <tr>
                <td>AMBIPAR - Atendimento Contratado</td>
                <td><a href="tel:08001172020">0800 117 2020</a> (somente coord. PAE poderá)</td>
              </tr>
              <tr>
                <td>Petrobas</td>
                <td> <a href="tel:+552227538800">(22) 2753-8800</a> </td>
              </tr>
            </tbody>
            
          </table>
      
          <table>
            <tbody>
              <tr>
                <th>HOSPITAL / ATENDIMENTO MÉDICO</th>
                <th>ENDEREÇO E TELEFONE</th>
              </tr>
              <tr>
                <td>HOSPITAL PÚBLICO HPM</td>
                <td>Rodovia RJ 168 - 4Km,168 - Virgem Santa - Macaé - <a href="tel:+552227730061">(22) 2773-0061</a></td>
              </tr>
              <tr>
                <td>HOSPITAL UNIMED COSTA DO SOL</td>
                <td>Estr. Heroína Lima Vieira Azevedo, 73 - Glória - Macaé - <a href="tel:+552221058008">(22) 2105-8008</a> / <a href="tel:+552227634000">(22) 2763-4000</a> / <a href="tel:+552227720205">(22) 2772-0205</a></td>
              </tr>
            </tbody>
          </table>
      
          <table>
            <thead>
              <tr>
                <th colSpan="2">QSMS / BRIGADA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a href="tel:+5522997569102">(22) 99756-9102</a> - QSMS Base</td>
                <td><a href="tel:+5522999134435">(22) 99913-4435</a> - TST Lider</td>
              </tr>
              <tr>
                <td><a href="tel:+5522992686103">(22) 99268-6103</a> - QSMS Operação</td>
                <td><a href="tel:+5522997006350">(22) 99700-6350</a> - TST Ocorrências</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
      
}

export default ChamadaEmergencia;

