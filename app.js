/**********************************************************************************************
 * Objetivo: Criar uma API para realizar o CRUD do sistema de controle de filmes
 * Data: 11/02/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 * Observação:
 *          Para criar a API precisamos instalar:
 *              express         npm install express --save
 *              cors            npm install cors --save
 *              body-parser     npm install body-parser --save
 * 
 *          Para criar a integração com o Banco de Dados precisamos instalar:
 *              prisma          npm install prisma --save (para fazer a conexão com o BD)
 *              prisma/client   npm install @prisma/client --save (rodar os scripts SQL)
 ********************************************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')
const {request}  = require('http')

const app = express()

app.use((request, response, next) =>{

    response.header('Acess-Control-Allow-Origin', '*')

    response.header('Acess-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

