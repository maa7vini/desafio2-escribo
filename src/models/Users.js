import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    telefones: [{numero: Number, ddd: Number}],
    criadoEm: String,
    atualizadoEm: String,
    ultimoLogin: String
})

export default mongoose.model('Users', userSchema)