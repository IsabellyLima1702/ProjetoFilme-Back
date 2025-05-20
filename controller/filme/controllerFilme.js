/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

const controllerClassificacao = require('../../controller/classificacao/controllerClassificacao.js')
const controllerIdiomas = require('../idioma/controllerIdioma.js')

//Função para tratar a inserção de um novo filme no DAO
const inserirFilme = async function(filme, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (filme.nome              == ''        || filme.nome              == undefined        || filme.nome            == null || filme.nome.length            > 80 || 
                filme.duracao           == ''        || filme.duracao           == undefined        || filme.duracao         == null || filme.duracao.length         > 5  ||
                filme.sinopse           == ''        || filme.sinopse           == undefined        || filme.sinopse         == null ||
                filme.data_lancamento   == ''        || filme.data_lancamento   == undefined        || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
                filme.foto_capa         == undefined || filme.foto_capa.length    > 200             ||
                filme.link_trailer      == undefined || filme.link_trailer.length > 200             ||
                filme.id_classificacao  == ''        || filme.id_classificacao  == undefined        ||
                filme.id_idioma         == ''        || filme.id_idioma         == undefined        
              


            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultFilme = await filmeDAO.insertFilme(filme)

                if(resultFilme)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }  
    
}

//Função para tratar a atualização de um filme no DAO
const atualizarFilme = async function(id, filme, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                      == ''        || id                           == undefined  || id                    == null || isNaN(id) ||               id <=0 ||              
                    filme.nome              == ''        || filme.nome                   == undefined  || filme.nome            == null || filme.nome.length            > 80 || 
                    filme.duracao           == ''        || filme.duracao                == undefined  || filme.duracao         == null || filme.duracao.length         > 5  ||
                    filme.sinopse           == ''        || filme.sinopse                == undefined  || filme.sinopse         == null ||
                    filme.data_lancamento   == ''        || filme.data_lancamento        == undefined  || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
                    filme.foto_capa         == undefined || filme.foto_capa.length    > 200            ||
                    filme.link_trailer      == undefined || filme.link_trailer.length > 200            ||
                    filme.id_classificacao  == ''        || filme.id_classificacao        == undefined ||
                    filme.id_idioma         == ''        || filme.id_idioma               == undefined 
                    
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

                    if(resultFilme != false || typeof(resultFilme) == 'object'){
                        if(resultFilme.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            filme.id = parseInt(id)

                            let result = await filmeDAO.updateFilme(filme)

                            if(result){
                                return message.SUCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }           
}

//Função para tratar a exclusão de um filme no DAO
const excluirFilme = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

            if(resultFilme != false || typeof(resultFilme) == 'object'){
                //Se existir, faremos o delete
                if(resultFilme.length > 0){
                    //delete
                    let result = await filmeDAO.deleteFilme(parseInt(id))

                    if(result){
                        return message.SUCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de filmes do DAO
const listarFilme = async function(){
    try {
        let arrayFilmes = []

        //Objeto do tipo JSON
        let dadosFilme = {}
        //Função para retornar os filmes cadastrados
        let resultFilme = await filmeDAO.selectAllFilme()

        if(resultFilme != false || typeof(resultFilme) == 'object'){
            if(resultFilme.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.items = resultFilme.length

                for(const itemFilme of resultFilme){
                    let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                    let dadosIdioma        = await controllerIdiomas.buscarIdioma(itemFilme.id_idioma) 
                    
                    //delete itemFilme.id_classificacao
                    //delete itemFilme.id_idioma

                    itemFilme.classificacao = dadosClassificacao.classificacao
                    itemFilme.idioma       = dadosIdioma.idioma
            
                    arrayFilmes.push(itemFilme)
                }
                dadosFilme.films = arrayFilmes

                return dadosFilme
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um filme filtrando pelo ID do DAO
const buscarFilme = async function(id){
    try {

        let arrayFilmes = []

        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosFilme = {}

            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))
            console.log(resultFilme)
            if(resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200

                    for(const itemFilme of resultFilme){
                        let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                        let dadosIdioma = await controllerIdiomas.buscarIdioma(itemFilme.id_idioma)
    
                        itemFilme.classificacao = dadosClassificacao.classificacao
                        itemFilme.idioma = dadosIdioma.idioma
    
                        //delete itemFilme.id_classificacao
                        //delete itemFilme.id_idioma
    
                        arrayFilmes.push(itemFilme)
                    }
                    dadosFilme.films = arrayFilmes

                    return dadosFilme //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}