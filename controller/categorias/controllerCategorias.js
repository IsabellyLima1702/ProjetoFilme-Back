/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/categorias/categorias.js')

//Função para tratar a inserção de um novo filme no DAO

const inserirCategorias = async function(categorias, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (categorias.nome            == ''        || categorias.nome        == undefined || categorias.nome            == null || categorias.nome.length            > 20 || 
                categorias.descricao       == ''        || categorias.descricao   == undefined || categorias.descricao       == null || categorias.descricao.length       > 150  
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultCategorias = await filmeDAO.insertCategorias(categorias)

                if(resultCategorias)
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

const atualizarCategorias = async function(id, categorias, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                    == ''        || id                    == undefined || id                    == null || isNaN(id) ||               id <=0  ||              
                    categorias.nome       == ''        || categorias.nome       == undefined || categorias.nome       == null || categorias.nome.length        > 20 || 
                    categorias.descricao  == ''        || categorias.descricao  == undefined || categorias.descricao  == null || categorias.descricao.length   > 150  
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultCategorias = await filmeDAO.selectByIdCategorias(parseInt(id))

                    if(resultCategorias != false || typeof(resultCategorias) == 'object'){
                        if(resultCategorias.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            categorias.id = parseInt(id)

                            let result = await filmeDAO.updateCategorias(categorias)

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

const excluirCategorias = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultCategorias = await filmeDAO.selectByIdCategorias(parseInt(id))

            if(resultCategorias != false || typeof(resultCategorias) == 'object'){
                //Se existir, faremos o delete
                if(resultCategorias.length > 0){
                    //delete
                    let result = await filmeDAO.deleteCategorias(parseInt(id))

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
const listarCategorias = async function(){
    try {
        //Objeto do tipo JSON
        let dadosCategorias = {}
        //Função para retornar os filmes cadastrados
        let resultCategorias = await filmeDAO.selectAllCategorias()

        if(resultCategorias != false || typeof(resultCategorias) == 'object'){
            if(resultCategorias.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosCategorias.status = true
                dadosCategorias.status_code = 200
                dadosCategorias.items = resultCategorias.length
                dadosCategorias.films = resultCategorias

                return dadosCategorias
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

const buscarCategorias = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosCategorias = {}

            let resultCategorias = await filmeDAO.selectByIdCategorias(parseInt(id))
            console.log(resultCategorias)
            if(resultCategorias != false || typeof(resultCategorias) == 'object'){
                if(resultCategorias.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosCategorias.status = true
                    dadosCategorias.status_code = 200
                    dadosCategorias.films = resultCategorias

                    return dadosCategorias //200
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
    inserirCategorias,
    atualizarCategorias,
    excluirCategorias,
    listarCategorias,
    buscarCategorias
}