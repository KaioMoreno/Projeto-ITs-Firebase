import jwt from 'jsonwebtoken'
import UserModel from '../model/user.js'

const geradorToken = (id, cargo) => jwt.sign({id:id, cargo:cargo},process.env.SECRET_JWT, {expiresIn: '5h'});

export default geradorToken;