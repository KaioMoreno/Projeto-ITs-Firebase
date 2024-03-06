import path from 'path'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage'



admin.initializeApp({
    credential: admin.credential.cert(path.join(process.cwd(), 'accountKEY.json')),
    storageBucket: "itsvix-23a2a.appspot.com",
  });

const storage = admin.storage();
const bucket = storage.bucket();


const FileFirebaseStorage = {

    async getFile(req, res) {

    },

    async getFolders(req, res) {
        const { setor } = req.params;
    
        try {
            const caminhoSetor = `${setor}/`;
    
            // Lista todos os objetos dentro do prefixo especificado
            const [objetos] = await bucket.getFiles({
                prefix: caminhoSetor
            });
    
            // Extrai apenas os nomes das pastas
            const nomesPastas = objetos
                .map(objeto => objeto.name.replace(caminhoSetor, ''))
                .filter(nome => nome.includes('/'))
                .map(nome => nome.split('/')[0]);
    
            // Remove duplicatas
            const pastasUnicas = Array.from(new Set(nomesPastas));
    
            // Objeto para armazenar as pastas e seus arquivos
            const pastasComArquivos = {};
    
            // Para cada pasta única, listar os arquivos dentro dela
            await Promise.all(pastasUnicas.map(async pasta => {
                const [arquivos] = await bucket.getFiles({
                    prefix: `${caminhoSetor}${pasta}/`
                });
                // Extrair apenas os nomes dos arquivos
                const nomesArquivos = arquivos.map(arquivo => arquivo.name.replace(`${caminhoSetor}${pasta}/`, ''));
                // Para cada arquivo, obter a URL de download
                const urlsArquivos = await Promise.all(arquivos.map(async arquivo => {
                    const url = await arquivo.getSignedUrl({
                        action: 'read',
                        expires: '03-01-2500'
                    });
                    return {
                        nome: arquivo.name.replace(`${caminhoSetor}${pasta}/`, ''),
                        url: url[0]
                    };
                }));
                // Armazenar a pasta e seus arquivos no objeto
                pastasComArquivos[pasta] = urlsArquivos;
            }));
    
            res.json(pastasComArquivos);
        } catch (error) {
            console.error('Erro ao listar pastas do Firebase Storage:', error);
            res.status(500).json({ Message: 'Erro ao listar pastas do Firebase Storage' });
        }
    },


    async create(req, res) {
        const files = req.files;
        const { setor, nomeArquivo } = req.body;
    
        try {
            if (files.length !== 0) {
                // Caminho da pasta onde os arquivos serão salvos
                const caminhoPasta = `${setor}/${nomeArquivo}/`;
    
                // Salva cada arquivo dentro da pasta criada
                const savePromises = files.map(async (file) => {
                    const caminho = `${caminhoPasta}${file.originalname}`;
    
                    // Salve o conteúdo do arquivo no Firebase Storage
                    await bucket.file(caminho).save(file.buffer, {
                        metadata: {
                            contentType: file.mimetype
                        }
                    });
    
                    return `Arquivo ${file.originalname} salvo com sucesso em ${caminho}`;
                });
    
                // Execute todas as promessas de salvamento em paralelo
                const resultados = await Promise.all(savePromises);
    
                // Retorne uma resposta de sucesso com os resultados
                res.json({ Message: 'Arquivos salvos com sucesso', resultados });
            }
        } catch (error) {
            // Se ocorrer algum erro, retorne uma resposta de erro
            console.error('Erro ao criar arquivo(s) no Firebase Storage:', error);
            res.status(500).json({ success: false, message: 'Erro ao criar arquivo(s) no Firebase Storage' });
        }
    },
    
    async addDocuments(req, res) {
        const files = req.files
        const {setor, nome} = req.params

        try {
            const caminhoPasta = `${setor}/${nome}/ `;
    
            const addDocumentos = files.map(async (file) => {
                const caminho = `${caminhoPasta}${file.originalname}`;
    
                // Crie um arquivo no bucket
                const arquivo = bucket.file(caminho);
    
                // Crie um fluxo de gravação para o arquivo
                const stream = arquivo.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
    
                // Escreva o buffer no fluxo de gravação
                stream.end(file.buffer);
    
                // Aguarde o término da gravação
                await new Promise((resolve, reject) => {
                    stream.on('finish', resolve);
                    stream.on('error', reject);
                });

                await Promise.all(addDocumentos);

            });
    
            return res.status(200).send('Documentos adicionados com sucesso!');
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro interno do servidor');
        }

    },

    async delete(req, res) {

        const { setor, nome } = req.params;

        try {
            // Caminho completo para a pasta que será excluída
            const caminhoPasta = `${setor}/${nome}/`;
        
            const bucket = storage.bucket(process.env.STORAGEBUCKET);

            const [files] = await bucket.getFiles({
                prefix: caminhoPasta
            })

            await Promise.all(files.map(file => file.delete()));

            await bucket.deleteFiles({
                prefix: caminhoPasta
              });
            
            res.json({ Message: `Pasta ${nome} excluída com sucesso` });
          } catch (error) {
            console.error('Erro ao excluir pasta do Firebase Storage:', error);
            res.status(500).json({ Message: 'Erro ao excluir pasta do Firebase Storage' });
          }
        },

}

export default FileFirebaseStorage;