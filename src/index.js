import express from 'express'

import routes from './routes.js'
import connectUsers from './database/dataBase.js'

export const SECRET = "KSDJAKDJ339492MDKMDF37"

const port = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(routes)

connectUsers().then(() => {
    app.listen(port, () => {
        console.log(`Site e Banco conectados http://localhost:${port}/users`)
    })
}).catch((err) => {
    console.log('Ops, algo deu errado!')
})

