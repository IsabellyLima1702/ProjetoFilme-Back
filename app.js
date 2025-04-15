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
 *              
 *          Após a instalação do prisma e do prisma client, devemos:
 *              npx prisma init
 *              n
 ********************************************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()
const app = express()

app.use((request, response, next) =>{

    response.header('Acess-Control-Allow-Origin', '*')

    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTION')

    app.use(cors())

    next()
})

//Import do Controller
const controllerFilme = require('./controller/filme/controllerFilme')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resulFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resulFilme.status_code)
    response.json(resulFilme)
})

app.get('/v1/controle-filmes/filme', cors(), async function(request, response){
    //Chama a função para retornar filmes
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.delete('/v1/controle-filmes/filme/:id', cors(), async function(request, response){

    let idFilme = request.params.id

    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

//BodyParserJson é para garantir que eu vou receber os dados em Json
app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idFilme = request.params.id
    //Recebe os dados da requisição
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.post('/v1/controle-filmes/generos', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resulGenero = await controllerFilme.inserirGenero(dadosBody, contentType)

    response.status(resulGenero.status_code)
    response.json(resulGenero)
})

app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idGenero = request.params.id
    let dadosBody = request.body

    let resultGenero = await controllerFilme.atualizarGenero(idGenero, dadosBody, contentType)
    response.status(resultGenero.status_code)
    response.json(resultGenero)
    
})

app.delete('/v1/controle-filmes/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let resultGenero = await controllerFilme.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')

})
