import jwt from 'jsonwebtoken'
import UserModel from '../model/user.js'
import dotenv from 'dotenv'

const jwtMiddleware = (req, res, next) => {

    try {
        const { authorization } = req.headers

        if(!authorization) {
            return res.sendStatus(401)
        }

        const[bearer, token] = authorization.split(' ')

        if([bearer, token].length !== 2) {
            return res.sendStatus(401)
        }

        if(bearer !== "Bearer") {
            return res.sendStatus(401)
        }

        jwt.verify(token, process.env.SECRET_JWT,(error, decoded) => {

            if(error) {
                return res.sendStatus(401)
            } else {
                console.log(decoded)
            }
        })
    } catch (error) {
        console.error(error)
    }

    next()
}

export default jwtMiddleware;

