/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidadeDiretor/nacionalidadeDiretor.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirNacionalidadeDiretor = async function(nacionalidadeDiretor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    nacionalidadeDiretor.id_nacionalidade   == ''           || nacionalidadeDiretor.id_nacionalidade    == undefined    || nacionalidadeDiretor.id_nacionalidade  == null || isNaN(nacionalidadeDiretor.id_nacionalidade)  || nacionalidadeDiretor.id_nacionalidade <=0 ||
                    nacionalidadeDiretor.id_diretor         == ''           || nacionalidadeDiretor.id_diretor          == undefined    || nacionalidadeDiretor.id_diretor        == null || isNaN(nacionalidadeDiretor.id_diretor)        || nacionalidadeDiretor.id_diretor        <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultNacionalidade = await nacionalidadeDAO.insertNacionalidadeDiretor(nacionalidadeDiretor)

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
const atualizarNacionalidadeDiretor = async function(id, nacionalidadeDiretor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                                         == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                nacionalidadeDiretor.id_nacionalidade   == ''           || nacionalidadeDiretor.id_nacionalidade    == undefined    || nacionalidadeDiretor.id_nacionalidade  == null || isNaN(nacionalidadeDiretor.id_nacionalidade)  || nacionalidadeDiretor.id_nacionalidade <=0 ||
                nacionalidadeDiretor.id_diretor         == ''           || nacionalidadeDiretor.id_diretor          == undefined    || nacionalidadeDiretor.id_diretor        == null || isNaN(nacionalidadeDiretor.id_diretor)        || nacionalidadeDiretor.id_diretor        <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultDiretor = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(parseInt(id))

                    if(resultDiretor != false || typeof(resultDiretor) == 'object'){
                        if(resultDiretor.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            diretor.id = parseInt(id)

                            let result = await nacionalidadeDAO.updateNacionalidadeDiretor(nacionalidadeDAO)

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
const excluirNacionalidadeDiretor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(parseInt(id))

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                //Se existir, faremos o delete
                if(resultNacionalidade.length > 0){
                    //delete
                    let result = await nacionalidadeDAO.deleteNacionalidadeDiretor(parseInt(id))

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
const listarNacionalidadeDiretor = async function(){
    try {
        //Objeto do tipo JSON
        let dadosdiretor = {}
        //Chama a função para retornar os generos cadastrados
        let resultDiretor = await nacionalidadeDAO.selectAllNacionalidadeDiretor()

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
const buscarNacionalidadeDiretor= async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosdiretor = {}

            let resultDiretor = await nacionalidadeDAO.selectByIdNacionalidadeDiretor(parseInt(id))
            
            if(resultDiretor != false || typeof(resultDiretor) == 'object'){
                if(resultDiretor.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosdiretor.status = true
                    dadosdiretor.status_code = 200
                    dadosdiretor.diretor = resultDiretor

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
const buscarDiretorPorNacionalidade = async function(idNacionalidade){
    try {
        if(idNacionalidade == '' || idNacionalidade == undefined || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosdiretor = {}

            let resultNacionalidade = await nacionalidadeDAO.selectDiretorByIdNacionalidade(parseInt(idNacionalidade))
            
            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                if(resultNacionalidade.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosdiretor.status = true
                    dadosdiretor.status_code = 200
                    dadosdiretor.diretor = resultNacionalidade

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
    inserirNacionalidadeDiretor,
    atualizarNacionalidadeDiretor,
    excluirNacionalidadeDiretor,
    listarNacionalidadeDiretor,
    buscarNacionalidadeDiretor,
    buscarDiretorPorNacionalidade
} 