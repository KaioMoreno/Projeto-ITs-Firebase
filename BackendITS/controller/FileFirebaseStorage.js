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
    
            const nomesPastas = objetos
                .map(objeto => objeto.name.replace(caminhoSetor, ''))
                .filter(nome => nome.includes('/'))
                .map(nome => nome.split('/')[0]);
    

            const pastasUnicas = Array.from(new Set(nomesPastas));
    
           
            const pastasComArquivos = {};
    
           
            await Promise.all(pastasUnicas.map(async pasta => {
                const [arquivos] = await bucket.getFiles({
                    prefix: `${caminhoSetor}${pasta}/`
                });
               
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
                
                const caminhoPasta = `${setor}/${nomeArquivo}/`;
    
               
                const savePromises = files.map(async (file) => {
                    const caminho = `${caminhoPasta}${file.originalname}`;
    
                   
                    await bucket.file(caminho).save(file.buffer, {
                        metadata: {
                            contentType: file.mimetype
                        }
                    });
    
                    return `Arquivo ${file.originalname} salvo com sucesso em ${caminho}`;
                });
    
               
                const resultados = await Promise.all(savePromises);
    
               
                res.json({ Message: 'Arquivos salvos com sucesso', resultados });
            }
        } catch (error) {
        
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
    
                
                const arquivo = bucket.file(caminho);
    
                const stream = arquivo.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
    
        
                stream.end(file.buffer);
    

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