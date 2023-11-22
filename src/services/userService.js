import Users from "../models/Users.js";

import { hash } from "bcrypt";
import { genSalt, compare } from "bcrypt";

export async function getAllUsers() {
    try {
        const users = await Users.find()
        return users
    } catch(err) {
        return err
    }
}

export async function saveUser(payload) {
    try {
        if(payload) {
            const salt = await genSalt(12)
            const senhaHash = await hash(payload.senha, salt)
        
            payload.senha = senhaHash

            const diaAtual = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
            const newPayload = {
                ...payload,
                criadoEm: diaAtual,
                atualizadoEm: diaAtual,
                ultimoLogin: ""
            }
            const newUser = await Users.create(newPayload)
            return newUser
        }

        return {"Erro": "O usuário que sera cadastrado não foi informado!"}

    } catch(err) {
        return err
    }
}

export async function verifyEmailUser(email) {
    const result = await Users.findOne({email: email})

    return result !== null ? true : false
}

export async function userLogin(email, senha) {
    const user = await Users.findOne({email: email})

    if(user) {
        const checkSenha = await compare(senha, user.senha)   

        if(checkSenha) {

            const diaAtual = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()

            await Users.findOneAndUpdate({_id: user._id}, {ultimoLogin: diaAtual})

            user.ultimoLogin = diaAtual

            return {
                status: "OK",
                user: user
            }
        } else {
            return {
                status: "NO OK",
                user: null
            }
        }
    }

    return {
        status: "NO OK",
        user: null
    }
}

export async function getUserByNameOrEmail(name) {
    try {
        const response = await Users.findOne({nome: name})

        return response 
         
    } catch(err) {
        console.error(err)
        return {"mensagem": err}
    }
}