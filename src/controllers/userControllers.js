import { SECRET } from "../index.js"
import { getAllUsers, getUserByNameOrEmail, saveUser, userLogin, verifyEmailUser } from "../services/userService.js"

import jwt from 'jsonwebtoken'

export async function getUsers(req, res){
    try {
        const results = await getAllUsers()

        let newResults = []

        for(let i = 0; i < results.length; i++) {
            newResults.push({
                nome: results[i].nome,
                email: results[i].email,
                senha: results[i].senha,
                telefones: results[i].telefones
            })
        }

        return res.status(200).json(newResults)
    } catch(err) {
        console.error(err)
        return res.status(400).send(err)
    }
}

export async function addUser(req, res){
    try {
        const user = req.body

        const userExists = await verifyEmailUser(user.email) 

        if(userExists) {
            return res.status(422).json({"mensagem": "E-mail já existente"})
        }
 
        const newUser = await saveUser(user)

        const response = {
            "id": newUser._id,
            "data_criacao": newUser.criadoEm,
            "data_atualizacao": newUser.atualizadoEm,
            "ultimo_login": newUser.ultimoLogin,
            "token": ""
        }

        return res.status(201).json(response)
    } catch(err){
        console.error(err)
        return res.status(400).send(err)
    }
}

export async function authUser(req, res) {
    try {
        const { email, senha } = req.body
        const result = await userLogin(email, senha)

        if(result.status === "OK") {

            const token = jwt.sign(
                {
                  id: result.user._id,
                },
                SECRET,
                {
                    expiresIn: "30m"
                }
            );

            const response = {
                "id": result.user._id,
                "data_criacao": result.user.criadoEm,
                "data_atualizacao": result.user.atualizadoEm,
                "ultimo_login": result.user.ultimoLogin,
                "token": token
            }

            return res.status(200).json(response)
        } else {
            return res.status(401).json({"mensagem": "Usuário e/ou senha inválidos!"})
        }
    } catch(err) {
        console.error(err)
        return res.status(400).send(err)
    }
}

export async function getUser(req, res) {
    try {
        const { nome } = req.body

        if(!nome) {
            return res.status(400).json({"mensagem": "O nome precisa ser informado!"})
        }

        const result = await getUserByNameOrEmail(nome)

        if(result !== null) {

            if(result.mensagem) {
                return res.status(400).json(result)
            }

            return res.status(200).json(result)
        } else {
            return res.status(404).json({"mensagem": "Usuário não encontrado!"})
        }

    } catch(err) {
        console.error(err)
        return res.status(400).send(err)
    }
}