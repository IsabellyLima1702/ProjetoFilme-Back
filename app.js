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
const controllerAvaliacao = require('./controller/avaliacao/controllerAvaliacao')
const controllerSexo = require('./controller/sexo/controllerSexo')
const controllerPremiacao = require('./controller/premiacao/controllerPremiacao')
const controllerAtor = require('./controller/ator/controllerAtor')
const controllerDiretor = require('./controller/diretor/controllerDiretor')
const controllerAtorNacionalidade = require('./controller/atorNacionalidade/controllerNacionalidadeAtor')
const controllerDiretorNacionalidade = require('./controller/diretorNacionalidade/controllerNacionalidadeDiretor')
const controllerFilmeAtor = require('./controller/filmeAtor/controllerFilmeAtor')
const controllerFilmeDiretor = require('./controller/filmeDiretor/controllerFilmeDiretor')
const controllerFilmePremiacao = require('./controller/filmePremiacao/controllerFilmePremiacao')
const controllerFilmeGenero = require ('./controller/filmeGenero/controllerFilmeGenero')


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

app.post('/v1/controle-filmes/avaliacao', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultAvaliacao = await controllerAvaliacao.inserirAvaliacao(dadosBody, contentType)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.get('/v1/controle-filmes/avaliacao', cors(), async function(request, response){
    //Chama a função para retornar filmes
    let resultAvaliacao = await controllerAvaliacao.listarAvaliacao()

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.get('/v1/controle-filmes/avaliacao/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idAvaliacao = request.params.id

    let resultAvaliacao = await controllerAvaliacao.buscarAvaliacao(idAvaliacao)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.delete('/v1/controle-filmes/avaliacao/:id', cors(), async function(request, response){

    let idAvaliacao = request.params.id

    let resultAvaliacao = await controllerAvaliacao.excluirAvaliacao(idAvaliacao)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

//BodyParserJson é para garantir que eu vou receber os dados em Json
app.put('/v1/controle-filmes/avaliacao/:id', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idAvaliacao = request.params.id
    //Recebe os dados da requisição
    let dadosBody = request.body

    let resultAvaliacao = await controllerAvaliacao.atualizarAvaliacao(idAvaliacao, dadosBody, contentType)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

app.get('/v1/controle-filmes/premiacao', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultPremiacao = await controllerPremiacao.listarPremiacao()

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.get('/v1/controle-filmes/premiacao/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idPremiacao = request.params.id

    let resultPremiacao = await controllerPremiacao.buscarPremiacao(idPremiacao)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.post('/v1/controle-filmes/premiacao', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultPremiacao = await controllerPremiacao.inserirPremiacao(dadosBody, contentType)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.put('/v1/controle-filmes/premiacao/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idPremiacao = request.params.id
    let dadosBody = request.body

    let resultPremiacao = await controllerPremiacao.atualizarPremiacao(idPremiacao, dadosBody, contentType)
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
    
})

app.delete('/v1/controle-filmes/premiacao/:id', cors(), async function(request, response){

    let idPremiacao = request.params.id

    let resultPremiacao = await controllerPremiacao.excluirPremiacao(idPremiacao)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.get('/v1/controle-filmes/sexo', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultSexo = await controllerSexo.listarSexo()

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-filmes/sexo/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idSexo = request.params.id

    let resultSexo = await controllerSexo.buscarSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})


app.post('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultSexo = await controllerSexo.inserirSexo(dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.put('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idSexo = request.params.id
    let dadosBody = request.body

    let resultSexo = await controllerSexo.atualizarSexo(idSexo, dadosBody, contentType)
    response.status(resultSexo.status_code)
    response.json(resultSexo)
    
})

app.delete('/v1/controle-filmes/sexo/:id', cors(), async function(request, response){

    let idSexo = request.params.id

    let resultSexo = await controllerSexo.excluirSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-filmes/ator', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultAtor = await controllerAtor.listarAtor()

    response.status(resultAtor.status_code)
    response.json(resultAtor)
})

app.get('/v1/controle-filmes/ator/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idAtor = request.params.id

    let resultAtor = await controllerAtor.buscarAtor(idAtor)

    response.status(resultAtor.status_code)
    response.json(resultAtor)
})

app.post('/v1/controle-filmes/ator', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultAtor = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(resultAtor.status_code)
    response.json(resultAtor)
})

app.put('/v1/controle-filmes/ator/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idAtor = request.params.id
    let dadosBody = request.body

    let resultAtor = await controllerAtor.atualizarAtor(idAtor, dadosBody, contentType)
    response.status(resultAtor.status_code)
    response.json(resultAtor)
    
})

app.delete('/v1/controle-filmes/ator/:id', cors(), async function(request, response){

    let idAtor = request.params.id

    let resultAtor = await controllerAtor.excluirAtor(idAtor)

    response.status(resultAtor.status_code)
    response.json(resultAtor)
})

app.get('/v1/controle-filmes/diretor', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultDiretor = await controllerDiretor.listarDiretor()

    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})

app.get('/v1/controle-filmes/diretor/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idDiretor = request.params.id

    let resultDiretor = await controllerDiretor.buscarDiretor(idDiretor)

    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})

app.post('/v1/controle-filmes/diretor', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultDiretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)

    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})

app.put('/v1/controle-filmes/diretor/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idDiretor = request.params.id
    let dadosBody = request.body

    let resultDiretor = await controllerDiretor.atualizarDiretor(idDiretor, dadosBody, contentType)
    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
    
})

app.delete('/v1/controle-filmes/diretor/:id', cors(), async function(request, response){

    let idDiretor = request.params.id

    let resultDiretor = await controllerDiretor.excluirDiretor(idDiretor)

    response.status(resultDiretor.status_code)
    response.json(resultDiretor)
})

app.get('/v1/controle-filmes/nacionalidadeAtor', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultNacionalidadeAtor = await controllerAtorNacionalidade.listarNacionalidadeAtor()

    response.status(resultNacionalidadeAtor.status_code)
    response.json(resultNacionalidadeAtor)
})

app.get('/v1/controle-filmes/nacionalidadeAtor/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idNacionalidadeAtor = request.params.id

    let resultNacionalidadeAtor = await controllerAtorNacionalidade.buscarNacionalidadeAtor(idNacionalidadeAtor)

    response.status(resultNacionalidadeAtor.status_code)
    response.json(resultNacionalidadeAtor)
})

app.post('/v1/controle-filmes/nacionalidadeAtor', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultNacionalidadeAtor = await controllerAtorNacionalidade.inserirNacionalidadeAtor(dadosBody, contentType)

    response.status(resultNacionalidadeAtor.status_code)
    response.json(resultNacionalidadeAtor)
})

app.put('/v1/controle-filmes/nacionalidadeAtor/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idNacionalidadeAtor = request.params.id
    let dadosBody = request.body

    let resultNacionalidadeAtor = await controllerAtorNacionalidade.atualizarNacionalidadeAtor(idNacionalidadeAtor, dadosBody, contentType)
    response.status(resultNacionalidadeAtor.status_code)
    response.json(resultNacionalidadeAtor)
    
})

app.delete('/v1/controle-filmes/nacionalidadeAtor/:id', cors(), async function(request, response){

    let idNacionalidadeAtor = request.params.id

    let resultNacionalidadeAtor = await controllerAtorNacionalidade.excluirNacionalidadeAtor(idNacionalidadeAtor)

    response.status(resultNacionalidadeAtor.status_code)
    response.json(resultNacionalidadeAtor)
})

app.get('/v1/controle-filmes/nacionalidadeDiretor', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultNacionalidadeDiretor = await controllerDiretorNacionalidade.listarNacionalidadeDiretor()

    response.status(resultNacionalidadeDiretor.status_code)
    response.json(resultNacionalidadeDiretor)
})

app.get('/v1/controle-filmes/nacionalidadeDiretor/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idNacionalidadeDiretor = request.params.id

    let resultNacionalidadeDiretor = await controllerDiretorNacionalidade.buscarNacionalidadeDiretor(idNacionalidadeDiretor)

    response.status(resultNacionalidadeDiretor.status_code)
    response.json(resultNacionalidadeDiretor)
})

app.post('/v1/controle-filmes/nacionalidadeDiretor', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultNacionalidadeDiretor = await controllerDiretorNacionalidade.inserirNacionalidadeDiretor(dadosBody, contentType)

    response.status(resultNacionalidadeDiretor.status_code)
    response.json(resultNacionalidadeDiretor)
})

app.put('/v1/controle-filmes/nacionalidadeDiretor/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idNacionalidadeDiretor = request.params.id
    let dadosBody = request.body

    let resultNacionalidadeDiretor = await controllerDiretorNacionalidade.atualizarNacionalidadeDiretor(idNacionalidadeDiretor, dadosBody, contentType)
    response.status(resultNacionalidadeDiretor.status_code)
    response.json(resultNacionalidadeDiretor)
    
})

app.delete('/v1/controle-filmes/nacionalidadeDiretor/:id', cors(), async function(request, response){

    let idNacionalidadeDiretor = request.params.id

    let resultNacionalidadeDiretor = await controllerDiretorNacionalidade.excluirNacionalidadeDiretor(idNacionalidadeDiretor)

    response.status(resultNacionalidadeDiretor.status_code)
    response.json(resultNacionalidadeDiretor)
})

app.get('/v1/controle-filmes/filmeAtor', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultFilmeAtor = await controllerFilmeAtor.listarFilmeAtor()

    response.status(resultFilmeAtor.status_code)
    response.json(resultFilmeAtor)
})

app.get('/v1/controle-filmes/filmeAtor/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilmeAtor = request.params.id

    let resultFilmeAtor = await controllerFilmeAtor.buscarFilmeAtor(idFilmeAtor)

    response.status(resultFilmeAtor.status_code)
    response.json(resultFilmeAtor)
})

app.post('/v1/controle-filmes/filmeAtor', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultFilmeAtor = await controllerFilmeAtor.inserirFilmeAtor(dadosBody, contentType)

    response.status(resultFilmeAtor.status_code)
    response.json(resultFilmeAtor)
})

app.put('/v1/controle-filmes/filmeAtor/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idFilmeAtor = request.params.id
    let dadosBody = request.body

    let resultFilmeAtor = await controllerFilmeAtor.atualizarFilmeAtor(idFilmeAtor, dadosBody, contentType)
    response.status(resultFilmeAtor.status_code)
    response.json(resultFilmeAtor)
    
})

app.delete('/v1/controle-filmes/filmeAtor/:id', cors(), async function(request, response){

    let idFilmeAtor = request.params.id

    let resultFilmeAtor = await controllerFilmeAtor.excluirFilmeAtor(idFilmeAtor)

    response.status(resultFilmeAtor.status_code)
    response.json(resultFilmeAtor)
})

app.get('/v1/controle-filmes/filmeDiretor', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultFilmeDiretor = await controllerFilmeDiretor.listarFilmeDiretor()

    response.status(resultFilmeDiretor.status_code)
    response.json(resultFilmeDiretor)
})

app.get('/v1/controle-filmes/filmeDiretor/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilmeDiretor = request.params.id

    let resultFilmeDiretor = await controllerFilmeDiretor.buscarFilmeDiretor(idFilmeDiretor)

    response.status(resultFilmeDiretor.status_code)
    response.json(resultFilmeDiretor)
})

app.post('/v1/controle-filmes/filmeDiretor', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultFilmeDiretor = await controllerFilmeDiretor.inserirFilmeDiretor(dadosBody, contentType)

    response.status(resultFilmeDiretor.status_code)
    response.json(resultFilmeDiretor)
})

app.put('/v1/controle-filmes/filmeDiretor/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idFilmeDiretor = request.params.id
    let dadosBody = request.body

    let resultFilmeDiretor = await controllerFilmeDiretor.atualizarFilmeDiretor(idFilmeDiretor, dadosBody, contentType)
    response.status(resultFilmeDiretor.status_code)
    response.json(resultFilmeDiretor)
    
})

app.delete('/v1/controle-filmes/filmeDiretor/:id', cors(), async function(request, response){

    let idFilmeDiretor = request.params.id

    let resultFilmeDiretor = await controllerFilmeDiretor.excluirFilmeDiretor(idFilmeDiretor)

    response.status(resultFilmeDiretor.status_code)
    response.json(resultFilmeDiretor)
})

app.get('/v1/controle-filmes/filmePremiacao', cors(), async function(request, response){
    //Chama a função para retornar generos
    let resultFilmePremiacao = await controllerFilmePremiacao.listarFilmePremiacao()

    response.status(resultFilmePremiacao.status_code)
    response.json(resultFilmePremiacao)
})

app.get('/v1/controle-filmes/filmePremiacao/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilmePremiacao = request.params.id

    let resultFilmePremiacao = await controllerFilmePremiacao.buscarFilmePremiacao(idFilmePremiacao)

    response.status(resultFilmePremiacao.status_code)
    response.json(resultFilmePremiacao)
})

app.post('/v1/controle-filmes/filmePremiacao', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultFilmeDiretor = await controllerFilmeDiretor.inserirFilmeDiretor(dadosBody, contentType)

    response.status(resultFilmeDiretor.status_code)
    response.json(resultFilmeDiretor)
})

app.put('/v1/controle-filmes/filmePremiacao/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idFilmePremiacao = request.params.id
    let dadosBody = request.body

    let resultFilmePremiacao = await controllerFilmePremiacao.atualizarFilmePremiacao(idFilmePremiacao, dadosBody, contentType)
    response.status(resultFilmePremiacao.status_code)
    response.json(resultFilmePremiacao)
    
})

app.delete('/v1/controle-filmes/filmePremiacao/:id', cors(), async function(request, response){

    let idFilmePremiacao = request.params.id

    let resultFilmePremiacao = await controllerFilmePremiacao.excluirFilmePremiacao(idFilmePremiacao)

    response.status(resultFilmePremiacao.status_code)
    response.json(resultFilmePremiacao)
})

app.post('/v1/controle-filmes/filmeGenero', cors(), bodyParserJSON, async function(request, response){

    //Para receber o que tem dentro do envelope
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da aquisição os dados encaminhados
    let dadosBody = request.body
    let resultFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(dadosBody, contentType)

    response.status(resultFilmeGenero.status_code)
    response.json(resultFilmeGenero)
})

app.get('/v1/controle-filmes/filmeGenero', cors(), async function(request, response){
    //Chama a função para retornar filmes
    let resultFilmeGenero = await controllerFilmeGenero.listarFilmeGenero()

    response.status(resultFilmeGenero.status_code)
    response.json(resultFilmeGenero)
})

app.get('/v1/controle-filmes/filmeGenero/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilmeGenero = request.params.id

    let resultFilmeGenero = await controllerFilmeGenero.buscarFilmeGenero(idFilmeGenero)

    response.status(resultFilmeGenero.status_code)
    response.json(resultFilmeGenero)
})

app.delete('/v1/controle-filmes/filmeGenero/:id', cors(), async function(request, response){

    let idFilmeGenero = request.params.id

    let resultFilmeGenero = await controllerFilmeGenero.excluirFilmeGenero(idFilmeGenero)

    response.status(resultFilmeGenero.status_code)
    response.json(resultFilmeGenero)
})

//BodyParserJson é para garantir que eu vou receber os dados em Json
app.put('/v1/controle-filmes/filmeGenero/:id', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idFilmeGenero = request.params.id
    //Recebe os dados da requisição
    let dadosBody = request.body

    let resultFilmeGenero = await controllerFilmeGenero.atualizarFilmeGenero(idFilmeGenero, dadosBody, contentType)

    response.status(resultFilmeGenero.status_code)
    response.json(resultFilmeGenero)
})



app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')

})