/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/premiacao/premiacao.js')

//Função para tratar a inserção de um novo filme no DAO

const inserirPremiacao = async function(premiacao, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (premiacao.nome            == ''        || premiacao.nome           == undefined || premiacao.nome            == null || premiacao.nome.length            > 45 || 
                premiacao.nacionalidade   == ''        || premiacao.nacionalidade  == undefined || premiacao.nacionalidade   == null || premiacao.nacionalidade.length   > 15  
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultPremiacao = await filmeDAO.insertPremiacao(premiacao)

                if(resultPremiacao)
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

const atualizarPremiacao = async function(id, premiacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                        == ''        || id                       == undefined || id                        == null || isNaN(id) ||                  id <=0  ||              
                    premiacao.nome            == ''        || premiacao.nome           == undefined || premiacao.nome            == null || premiacao.nome.length            > 45 || 
                    premiacao.nacionalidade   == ''        || premiacao.nacionalidade  == undefined || premiacao.nacionalidade   == null || premiacao.nacionalidade.length   > 15  
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultPremiacao = await filmeDAO.selectByIdPremiacao(parseInt(id))

                    if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                        if(resultPremiacao.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            premiacao.id = parseInt(id)

                            let result = await filmeDAO.updatePremiacao(premiacao)

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

const excluirPremiacao = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultPremiacao = await filmeDAO.selectByIdPremiacao(parseInt(id))

            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                //Se existir, faremos o delete
                if(resultPremiacao.length > 0){
                    //delete
                    let result = await filmeDAO.deletePremiacao(parseInt(id))

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
const listarPremiacao = async function(){
    try {
        //Objeto do tipo JSON
        let dadosPremiacao = {}
        //Função para retornar os filmes cadastrados
        let resultPremiacao = await filmeDAO.selectAllPremiacao()

        if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
            if(resultPremiacao.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosPremiacao.status = true
                dadosPremiacao.status_code = 200
                dadosPremiacao.items = resultPremiacao.length
                dadosPremiacao.films = resultPremiacao

                return dadosPremiacao
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

const buscarPremiacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosPremiacao = {}

            let resultPremiacao = await filmeDAO.selectByIdPremiacao(parseInt(id))
            console.log(resultPremiacao)
            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                if(resultPremiacao.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.films = resultPremiacao

                    return dadosPremiacao //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirPremiacao,
    atualizarPremiacao,
    excluirPremiacao,
    listarPremiacao,
    buscarPremiacao
}