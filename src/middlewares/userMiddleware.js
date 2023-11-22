import jwt from 'jsonwebtoken';
import { SECRET } from "../index.js";

export const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ "mensagem": "Token não informado!" });
    }
  
    jwt.verify(token.replace('Bearer ', ''), SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ "mensagem": "Sessão inválida" });
            }
            return res.status(403).json({ "mensagem": "Não autorizado" });
        }
  
      req.user = decoded;
      next();
    });
  };