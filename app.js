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
const controllerGenero = require('./controller/genero/controllerGenero')
const controllerIdioma = require('./controller/idioma/controllerIdioma')
const controllerClassificacao = require('./controller/classificacao/controllerClassificacao')
const controllerNacionalidade = require('./controller/nacionalidade/controllerNacionalidade')
const controllerCategorias = require('./controller/categorias/controllerCategorias')





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
    let resulGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resulGenero.status_code)
    response.json(resulGenero)
})

app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idGenero = request.params.id
    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)
    response.status(resultGenero.status_code)
    response.json(resultGenero)
    
})

app.delete('/v1/controle-filmes/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-filmes/genero', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-filmes/genero/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.post('/v1/controle-filmes/idioma', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultIdioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.put('/v1/controle-filmes/idioma/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idIdioma = request.params.id
    let dadosBody = request.body

    let resultIdioma = await controllerIdioma.atualizarIdioma(idIdioma, dadosBody, contentType)
    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
    
})

app.delete('/v1/controle-filmes/idioma/:id', cors(), async function(request, response){

    let idIdioma = request.params.id

    let resultIdioma = await controllerIdioma.excluirIdioma(idIdioma)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-filmes/idioma', cors(), async function(request, response){
    //Chama a função para retornar filmes
    let resultIdioma = await controllerIdioma.listarIdioma()

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-filmes/idioma/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idIdioma = request.params.id

    let resultIdioma = await controllerIdioma.buscarIdioma(idIdioma)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.post('/v1/controle-filmes/classificacao', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultClassificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.put('/v1/controle-filmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idClassificacao = request.params.id
    //Recebe os dados da requisição
    let dadosBody = request.body

    let resultClassificacao = await controllerClassificacao.atualizarClassificacao(idClassificacao, dadosBody, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.get('/v1/controle-filmes/classificacao', cors(), async function(request, response){
    //Chama a função para retornar filmes
    let resultClassificacao = await controllerClassificacao.listarClassificacao()

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.get('/v1/controle-filmes/classificacao/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idClassificacao = request.params.id

    let resultClassificacao = await controllerClassificacao.buscarClassificacao(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.delete('/v1/controle-filmes/classificacao/:id', cors(), async function(request, response){

    let idClassificacao = request.params.id

    let resultClassificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.post('/v1/controle-filmes/nacionalidade', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultNacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.put('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idNacionalidade = request.params.id
    //Recebe os dados da requisição
    let dadosBody = request.body

    let resultNacionalidade = await controllerNacionalidade.atualizarNacionalidade(idNacionalidade, dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.get('/v1/controle-filmes/nacionalidade', cors(), async function(request, response){
    //Chama a função para retornar filmes
    let resultNacionalidade = await controllerNacionalidade.listarNacionalidade()

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.get('/v1/controle-filmes/nacionalidade/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idNacionalidade = request.params.id

    let resultNacionalidade = await controllerNacionalidade.buscarNacionalidade(idNacionalidade)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.delete('/v1/controle-filmes/nacionalidade/:id', cors(), async function(request, response){

    let idNacionalidade = request.params.id

    let resultNacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.post('/v1/controle-filmes/categorias', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultCategorias = await controllerCategorias.inserirCategorias(dadosBody, contentType)

    response.status(resultCategorias.status_code)
    response.json(resultCategorias)
})

//BodyParserJson é para garantir que eu vou receber os dados em Json
app.put('/v1/controle-filmes/categorias/:id', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idCategorias = request.params.id
    //Recebe os dados da requisição
    let dadosBody = request.body

    let resultCategorias = await controllerCategorias.atualizarCategorias(idCategorias, dadosBody, contentType)

    response.status(resultCategorias.status_code)
    response.json(resultCategorias)
})


app.get('/v1/controle-filmes/categorias', cors(), async function(request, response){
    //Chama a função para retornar filmes
    let resultCategorias = await controllerCategorias.listarCategorias()

    response.status(resultCategorias.status_code)
    response.json(resultCategorias)
})

app.get('/v1/controle-filmes/categorias/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idCategorias = request.params.id

    let resultCategorias = await controllerCategorias.buscarCategorias(idCategorias)

    response.status(resultCategorias.status_code)
    response.json(resultCategorias)
})

app.delete('/v1/controle-filmes/categorias/:id', cors(), async function(request, response){

    let idCategorias = request.params.id

    let resultCategorias = await controllerCategorias.excluirCategorias(idCategorias)

    response.status(resultCategorias.status_code)
    response.json(resultCategorias)
})


app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')

})
