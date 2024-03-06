import multer from 'multer';

const storageFirebase = multer.memoryStorage();

const uploadFirebase = multer({
  storage: storageFirebase,
  fileFilter: function(req, file, cb) {
    // Verifique se o arquivo é uma imagem JPEG
    if (file.mimetype === 'image/jpeg') {
      cb(null, true); // Aceita o arquivo
    } else {
      cb(null, false); // Rejeita o arquivo
      console.log("SÓ SÃO SUPORTADOS ARQUIVOS JPG");
    }
  },
  destination: function(req, file, cb) {
    // Defina o diretório de destino com base no setor enviado na requisição
    const setor = req.body.setor;
    let caminhoUpload = `${setor}`;
    cb(null, caminhoUpload);
  },
  filename: function(req, file, cb) {
    // Use o nome original do arquivo
    cb(null, file.originalname);
  }
});

export default uploadFirebase;


