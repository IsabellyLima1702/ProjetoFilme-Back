/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidadeAtor.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirNacionalidadeAtor = async function(nacionalidadeAtor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    nacionalidadeAtor.id_nacionalidade   == ''           || nacionalidadeAtor.id_nacionalidade    == undefined    || nacionalidadeAtor.id_nacionalidade  == null || isNaN(nacionalidadeAtor.id_nacionalidade)  || nacionalidadeAtor.id_nacionalidade <=0 ||
                    nacionalidadeAtor.id_atores          == ''           || nacionalidadeAtor.id_atores           == undefined    || nacionalidadeAtor.id_atores         == null || isNaN(nacionalidadeAtor.id_atores)         || nacionalidadeAtor.id_atores        <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultNacionalidade = await nacionalidadeDAO.insertNacionalidadeAtor(nacionalidadeAtor)

                    if(resultNacionalidade)
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
const atualizarNacionalidadeAtor = async function(id, nacionalidadeAtor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                                   == undefined    || id                                  == null || isNaN(id)  || id  <= 0   ||
                nacionalidadeAtor.id_nacionalidade    == ''           || nacionalidadeAtor.id_nacionalidade   == undefined    || nacionalidadeAtor.id_nacionalidade  == null || isNaN(nacionalidadeAtor.id_nacionalidade)  || nacionalidadeAtor.id_nacionalidade <=0 ||
                nacionalidadeAtor.id_atores           == ''           || nacionalidadeAtor.id_atores          == undefined    || nacionalidadeAtor.id_atores         == null || isNaN(nacionalidadeAtor.id_atores)        || nacionalidadeAtor.id_atores        <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultAtor = await nacionalidadeDAO.selectByIdNacionalidadeAtor(parseInt(id))

                    if(resultAtor != false || typeof(resultAtor) == 'object'){
                        if(resultAtor.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            ator.id = parseInt(id)

                            let result = await nacionalidadeDAO.updateNacionalidadeAtor(nacionalidadeAtor)

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
const excluirNacionalidadeAtor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidadeAtor(parseInt(id))

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                //Se existir, faremos o delete
                if(resultNacionalidade.length > 0){
                    //delete
                    let result = await nacionalidadeDAO.deleteNacionalidadeAtor(parseInt(id))

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
const listarNacionalidadeAtor = async function(){
    try {
        //Objeto do tipo JSON
        let dadosator = {}
        //Chama a função para retornar os generos cadastrados
        let resultAtor = await nacionalidadeDAO.selectAllNacionalidadeAtor()

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
const buscarNacionalidadeAtor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosator = {}

            let resultAtor = await nacionalidadeDAO.selectByIdNacionalidadeAtor(parseInt(id))
            
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
const buscarAtorPorNacionalidade = async function(idNacionalidade){
    try {
        if(idNacionalidade == '' || idNacionalidade == undefined || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosator = {}

            let resultNacionalidade = await nacionalidadeDAO.selectAtorByIdNacionalidade(parseInt(idNacionalidade))
            
            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                if(resultNacionalidade.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosator.status = true
                    dadosator.status_code = 200
                    dadosator.ator = resultNacionalidade

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
    inserirNacionalidadeAtor,
    atualizarNacionalidadeAtor,
    excluirNacionalidadeAtor,
    listarNacionalidadeAtor,
    buscarNacionalidadeAtor,
    buscarAtorPorNacionalidade
} 