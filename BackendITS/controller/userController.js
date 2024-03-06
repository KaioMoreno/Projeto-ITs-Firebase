import mongoose from 'mongoose'
import userModel from '../model/user.js'
import bcrypt from 'bcryptjs'
import geradorToken from '../services/jwtCreateToken.js'

const userController = {

    async create (req, res) {

        try {
            const{ nome, email, cargo, password} = req.body;
            let users = await userModel.create(req.body)

            return res.send({ Messagem: "USUÁRIO CRIADO COM SUCESSO",
                users: {
                    id:nome._id,
                    nome,
                    email,
                    cargo,
                    password,
                }
            })

        } catch(error) {
            console.error("ERRO:", error)
        }
    },

    async login (req, res) {

        try {
            const {email, password} = req.body;
            let users = await userModel.findOne({email: email})

            if(!users) {
                return res.send("Email ou Senha Incorreto")
            }

            const hashedpassword = await bcrypt.compare(password, users.password)

            if(hashedpassword === true) {
                const token = geradorToken(users.id, users.cargo)
                return res.json({token})
            } else {
                return res.send("Email ou Senha Incorreto")
            }

        } catch(error) {
            console.error("ERROR:", error)
        }
    },
}

export default userController;