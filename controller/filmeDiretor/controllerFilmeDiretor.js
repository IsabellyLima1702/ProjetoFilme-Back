/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmeDiretorDAO = require('../../model/DAO/filmeDiretor/filmeDiretor.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmeDiretor = async function(filmeDiretor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmeDiretor.id_filme              == ''           || filmeDiretor.id_filme     == undefined    || filmeDiretor.id_filme  == null   || isNaN(filmeDiretor.id_filme)   || filmeDiretor.id_filme  <=0 ||
                    filmeDiretor.id_diretor            == ''           || filmeDiretor.id_diretor   == undefined    || filmeDiretor.id_diretor == null  || isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultFilmeDiretor = await filmeDiretorDAO.insertFilmeDiretor(filmeDiretor)

                    if(resultFilmeDiretor)
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
const atualizarFilmeDiretor = async function(id, filmeDiretor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                 == ''           || id                       == undefined    || id                      == null || isNaN(id)  || id  <= 0   ||
                    filmeDiretor.id_filme              == ''           || filmeDiretor.id_filme    == undefined    || filmeDiretor.id_filme   == null || isNaN(filmeDiretor.id_filme)  || filmeDiretor.id_filme <=0 ||
                    filmeDiretor.id_diretor            == ''           || filmeDiretor.id_diretor  == undefined    || filmeDiretor.id_diretor == null || isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultDiretor = await filmeDiretorDAO.selectByIdFilmeDiretor(parseInt(id))

                    if(resultDiretor != false || typeof(resultDiretor) == 'object'){
                        if(resultDiretor.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            diretor.id = parseInt(id)

                            let result = await filmeDiretorDAO.updateFilmeDiretor(filmeDiretor)

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
const excluirFilmeDiretor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultDiretor = await filmeDiretorDAO.selectByIdFilmeDiretor(parseInt(id))

            if(resultDiretor != false || typeof(resultDiretor) == 'object'){
                //Se existir, faremos o delete
                if(resultDiretor.length > 0){
                    //delete
                    let result = await filmeDiretorDAO.deleteFilmeDiretor(parseInt(id))

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
const listarFilmeDiretor = async function(){
    try {
        //Objeto do tipo JSON
        let dadosdiretor = {}
        //Chama a função para retornar os generos cadastrados
        let resultDiretor = await filmeDiretorDAO.selectAllFilmeDiretor()

        if(resultDiretor != false || typeof(resultDiretor) == 'object'){
            if(resultDiretor.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosdiretor.status = true
                dadosdiretor.status_code = 200
                dadosdiretor.items = resultDiretor.length
                dadosdiretor.films = resultDiretor

                return dadosdiretor
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
const buscarFilmeDiretor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosdiretor = {}

            let resultdiretor = await filmeDiretorDAO.selectByIdFilmeDiretor(parseInt(id))
            
            if(resultdiretor != false || typeof(resultdiretor) == 'object'){
                if(resultdiretor.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosdiretor.status = true
                    dadosdiretor.status_code = 200
                    dadosdiretor.diretor = resultdiretor

                    return dadosdiretor //200
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
const buscarDiretorPorFilme = async function(idFilme){
    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosdiretor = {}

            let resultdiretor = await filmeDiretorDAO.selectDiretorByIdFilme (parseInt(idFilme))
            
            if(resultdiretor != false || typeof(resultdiretor) == 'object'){
                if(resultdiretor.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosdiretor.status = true
                    dadosdiretor.status_code = 200
                    dadosdiretor.diretor = resultdiretor

                    return dadosdiretor //200
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
    inserirFilmeDiretor,
    atualizarFilmeDiretor,
    excluirFilmeDiretor,
    listarFilmeDiretor,
    buscarFilmeDiretor,
    buscarDiretorPorFilme
} 