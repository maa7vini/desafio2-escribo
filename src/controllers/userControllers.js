import { getAllUsers, saveUser, userLogin, verifyEmailUser } from "../services/userService.js"

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
        console.log(err)
        return res.status(400).send(err)
    }
}

export async function authUser(req, res) {
    try {
        const { email, senha } = req.body
        const result = await userLogin(email, senha)

        const secret = "KSDJAKDJ339492MDKMDF37"

        if(result.status === "OK") {

            const token = jwt.sign(
                {
                  id: result.user._id,
                },
                secret
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
        console.log(err)
        return res.status(400).json(err)
    }
}

export async function getUserByID(req, res) {
    
}