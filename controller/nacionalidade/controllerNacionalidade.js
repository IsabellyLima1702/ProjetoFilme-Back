/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

//Função para tratar a inserção de um novo filme no DAO

const inserirNacionalidade = async function(nacionalidade, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (nacionalidade.nome            == ''        || nacionalidade.nome            == undefined || nacionalidade.nome            == null || nacionalidade.nome.length    > 80
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultNacionalidade = await filmeDAO.insertNacionalidade(nacionalidade)

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

//Função para tratar a atualização de um filme no DAO
const atualizarNacionalidade = async function(id, nacionalidade, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                    == ''        || id                    == undefined || id                    == null || isNaN(id) ||               id <=0 ||              
                    nacionalidade.nome    == ''        || nacionalidade.nome    == undefined || nacionalidade.nome    == null || nacionalidade.nome.length     > 10
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultNacionalidade = await filmeDAO.selectByIdNacionalidade(parseInt(id))

                    if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                        if(resultNacionalidade.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            nacionalidade.id = parseInt(id)

                            let result = await filmeDAO.updateNacionalidade(nacionalidade)

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
const excluirNacionalidade = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultNacionalidade = await filmeDAO.selectByIdNacionalidade(parseInt(id))

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                //Se existir, faremos o delete
                if(resultNacionalidade.length > 0){
                    //delete
                    let result = await filmeDAO.deleteNacionalidade(parseInt(id))

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
const listarNacionalidade = async function(){
    try {
        //Objeto do tipo JSON
        let dadosNacionalidade = {}
        //Função para retornar os filmes cadastrados
        let resultNacionalidade = await filmeDAO.selectAllNacionalidade()

        if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
            if(resultNacionalidade.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosNacionalidade.status = true
                dadosNacionalidade.status_code = 200
                dadosNacionalidade.items = resultNacionalidade.length
                dadosNacionalidade.films = resultNacionalidade

                return dadosNacionalidade
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
const buscarNacionalidade = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosNacionalidade = {}

            let resultNacionalidade = await filmeDAO.selectByIdNacionalidade(parseInt(id))
            console.log(resultNacionalidade)
            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                if(resultNacionalidade.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.films = resultNacionalidade

                    return dadosNacionalidade //200
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
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade
}