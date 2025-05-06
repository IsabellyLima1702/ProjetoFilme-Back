/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/classificacao/classificacao.js')

//Função para tratar a inserção de um novo filme no DAO


const inserirClassificacao = async function(classificacao, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (classificacao.sigla          == ''        || classificacao.sigla            == undefined || classificacao.sigla           == null || classificacao.sigla.length         > 2   ||
                classificacao.classificacao  == ''        || classificacao.classificacao    == undefined || classificacao.classificacao   == null || classificacao.classificacao.length > 80  ||
                classificacao.descricao      == ''        || classificacao.descricao        == undefined || classificacao.descricao       == null || classificacao.descricao.length     > 100
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultClassificacao = await filmeDAO.insertClassificacao(classificacao)

                if(resultClassificacao)
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
const atualizarClassificacao = async function(id, classificacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                          == ''        || id                          == undefined || id                            == null || isNaN(id) ||                      id <=0 ||
                    classificacao.sigla         == ''        || classificacao.sigla         == undefined || classificacao.sigla           == null || classificacao.sigla.length          > 2  || 
                    classificacao.classificacao == ''        || classificacao.classificacao == undefined || classificacao.classificacao   == null || classificacao.classificacao.length  > 80 ||
                    classificacao.descricao     == ''        || classificacao.descricao     == undefined || classificacao.descricao       == null || classificacao.descricao.length      > 100  
  

                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultClassificacao = await filmeDAO.selectByIdClassificacao(parseInt(id))

                    if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                        if(resultClassificacao.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            classificacao.id = parseInt(id)

                            let result = await filmeDAO.updateClassificacao(classificacao)

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
const excluirClassificacao = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultClassificacao = await filmeDAO.selectByIdClassificacao(parseInt(id))

            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                //Se existir, faremos o delete
                if(resultClassificacao.length > 0){
                    //delete
                    let result = await filmeDAO.deleteClassificao(parseInt(id))

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
const listarClassificacao = async function(){
    try {
        //Objeto do tipo JSON
        let dadosClassificacao = {}
        //Função para retornar os filmes cadastrados
        let resultClassificacao = await filmeDAO.selectAllClassificacao()

        if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
            if(resultClassificacao.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosClassificacao.status = true
                dadosClassificacao.status_code = 200
                dadosClassificacao.items = resultClassificacao.length
                dadosClassificacao.films = resultClassificacao

                return dadosClassificacao
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
const buscarClassificacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosClassificacao = {}

            let resultClassificacao = await filmeDAO.selectByIdClassificacao(parseInt(id))
            console.log(resultClassificacao)
            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                if(resultClassificacao.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.films = resultClassificacao

                    return dadosClassificacao //200
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
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    listarClassificacao,
    buscarClassificacao
}