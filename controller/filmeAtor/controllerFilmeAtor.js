/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmeAtorDAO = require('../../model/DAO/filmeAtor/filmeAtor.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmeAtor = async function(filmeAtor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmeAtor.id_filme    == ''           || filmeAtor.id_filme  == undefined    || filmeAtor.id_filme  == null   || isNaN(filmeAtor.id_filme)   || filmeAtor.id_filme  <=0 ||
                    filmeAtor.id_ator     == ''           || filmeAtor.id_ator   == undefined    || filmeAtor.id_ator   == null   || isNaN(filmeAtor.id_ator)    || filmeAtor.id_ator   <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultFilmeAtor = await filmeAtorDAO.insertFilmeAtor(filmeAtor)

                    if(resultFilmeAtor)
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
const atualizarFilmeAtor = async function(id, filmeAtor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                    == ''           || id                  == undefined    || id                      == null || isNaN(id)  || id  <= 0   ||
                    filmeAtor.id_filme    == ''           || filmeAtor.id_filme  == undefined    || filmeAtor.id_filme   == null || isNaN(filmeAtor.id_filme)  || filmeAtor.id_filme <=0 ||
                    filmeAtor.id_ator     == ''           || filmeAtor.id_ator   == undefined    || filmeAtor.id_ator == null || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator       <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))

                    if(resultAtor != false || typeof(resultAtor) == 'object'){
                        if(resultAtor.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            ator.id = parseInt(id)

                            let result = await filmeAtorDAO.updateFilmeAtor(filmeAtor)

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
const excluirFilmeAtor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))

            if(resultAtor != false || typeof(resultAtor) == 'object'){
                //Se existir, faremos o delete
                if(resultAtor.length > 0){
                    //delete
                    let result = await filmeAtorDAO.deleteFilmeAtor(parseInt(id))

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
const listarFilmeAtor = async function(){
    try {
        //Objeto do tipo JSON
        let dadosator = {}
        //Chama a função para retornar os generos cadastrados
        let resultAtor = await filmeAtorDAO.selectAllFilmeAtor()

        if(resultAtor != false || typeof(resultAtor) == 'object'){
            if(resultAtor.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosator.status = true
                dadosator.status_code = 200
                dadosator.items = resultAtor.length
                dadosator.films = resultAtor

                return dadosator
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
const buscarFilmeAtor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosdiretor = {}

            let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))
            
            if(resultAtor != false || typeof(resultAtor) == 'object'){
                if(resultAtor.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosator.status = true
                    dadosator.status_code = 200
                    dadosator.ator = resultAtor

                    return dadosator //200
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
const buscarAtorPorFilme = async function(idFilme){
    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosator = {}

            let resultAtor = await filmeAtorDAO.selectAtorByIdFilme (parseInt(idFilme))
            
            if(resultAtor != false || typeof(resultAtor) == 'object'){
                if(resultAtor.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosator.status = true
                    dadosator.status_code = 200
                    dadosator.ator = resultAtor

                    return dadosator //200
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
    inserirFilmeAtor,
    atualizarFilmeAtor,
    excluirFilmeAtor,
    listarFilmeAtor,
    buscarFilmeAtor,
    buscarAtorPorFilme
} 