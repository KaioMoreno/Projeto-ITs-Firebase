import express from 'express'
const routes = express.Router()
import userController from '../controller/userController.js'
import jwtMiddleware from '../middlewares/jwtMiddlewares.js'



import FileFirebaseStorage from '../controller/FileFirebaseStorage.js'
import uploadFirebase from '../config/MulterFirebase.js'


// User 
routes.post('/create', userController.create)
routes.post('/login', userController.login)


// Teste Firebase

routes.post('/admin/home', jwtMiddleware, uploadFirebase.array('files'), FileFirebaseStorage.create)
routes.post('/admin/home/add/:setor/:nome', jwtMiddleware, uploadFirebase.array('files'), FileFirebaseStorage.addDocuments)
routes.delete('/admin/home/:setor/:nome', jwtMiddleware, FileFirebaseStorage.delete)
routes.get('/:setor', FileFirebaseStorage.getFolders)



export default routes;