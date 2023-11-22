import express from 'express'

import routes from './routes.js'
import connectUsers from './database/dataBase.js'

export const SECRET = "KSDJAKDJ339492MDKMDF37"

const app = express()

app.use(express.json())
app.use(routes)

connectUsers().then(() => {
    app.listen(3001, () => {
        console.log('Site e Banco conectados http://localhost:3001/users')
    })
}).catch((err) => {
    console.log('Ops, algo deu errado!')
})

