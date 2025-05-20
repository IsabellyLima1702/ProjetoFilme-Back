/**********************************************************************************
 * Objetivo: Controller funcionando como tabela intermediária entre filme e genero
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmePremiacaoDAO = require('../../model/DAO/filmePremiacao/filmePremiacao.js')
//Função para tratar a inserção de um novo genero no DAO
const inserirFilmePremiacao = async function(filmePremiacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmePremiacao.id_filme          == ''           || filmePremiacao.id_filme      == undefined    || filmePremiacao.id_filme      == null || isNaN(filmePremiacao.id_filme)      || filmePremiacao.id_filme      <=0 ||
                    filmePremiacao.id_premiacoes     == ''           || filmePremiacao.id_premiacoes == undefined    || filmePremiacao.id_premiacoes == null || isNaN(filmePremiacao.id_premiacoes) || filmePremiacao.id_premiacoes <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultPremiacao = await filmePremiacaoDAO.insertFilmePremiacao(filmePremiacao)

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

//Função para tratar a atualização de um genero no DAO
const atualizarFilmePremiacao = async function(id, filmePremiacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                             == ''           || id                           == undefined    || id                           == null || isNaN(id)                           ||               id             <= 0 ||
                    filmePremiacao.id_filme        == ''           || filmePremiacao.id_filme      == undefined    || filmePremiacao.id_filme      == null || isNaN(filmePremiacao.id_filme)      || filmePremiacao.id_filme      <=0  ||
                    filmePremiacao.id_premiacoes   == ''           || filmePremiacao.id_premiacoes   == undefined  || filmePremiacao.id_premiacoes == null || isNaN(filmePremiacao.id_premiacoes) || filmePremiacao.id_premiacoes <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultPremiacao = await filmePremiacaoDAO.selectByIdFilmePremiacoes(parseInt(id))

                    if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                        if(resultPremiacao.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            premiacoes.id = parseInt(id)

                            let result = await filmePremiacaoDAO.updateFilmePremiacao(filmePremiacao)

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

//Função para tratar a exclusão de um genero no DAO
const excluirFilmePremiacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultPremiacao = await filmePremiacaoDAO.selectByIdFilmePremiacoes(parseInt(id))

            if(resultPremiacao != false || typeof(resultgenero) == 'object'){
                //Se existir, faremos o delete
                if(resultPremiacao.length > 0){
                    //delete
                    let result = await filmeGeneroDAO.deleteFilmeGenero(parseInt(id))

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

//Função para tratar o retorno de uma lista de generos do DAO
const listarFilmePremiacao = async function(){
    try {
        //Objeto do tipo JSON
        let dadosPremiacao = {}
        //Chama a função para retornar os generos cadastrados
        let resultPremiacao = await filmePremiacaoDAO.selectAllFilmePremiacao()

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

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarFilmePremiacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosPremiacao = {}

            let resultPremiacao = await filmePremiacaoDAO.selectByIdFilmePremiacoes(parseInt(id))
            
            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                if(resultPremiacao.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.premiacoes = resultPremiacao

                    return dadosPremiacao //200
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

//Função para retornar os generos relacionados a um filme
const buscarPremiacaoPorFilme = async function(idFilme){
    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosPremiacao = {}

            let resultPremiacao = await filmePremiacaoDAO.selectPremiacaoByIdFilme (parseInt(idFilme))
            
            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                if(resultPremiacao.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.premiacoes = resultPremiacao

                    return dadosPremiacao //200
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





module.exports = {
    inserirFilmePremiacao,
    atualizarFilmePremiacao,
    excluirFilmePremiacao,
    listarFilmePremiacao,
    buscarFilmePremiacao,
    buscarPremiacaoPorFilme
} 