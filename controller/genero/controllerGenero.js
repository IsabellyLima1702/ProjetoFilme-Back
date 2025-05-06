/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/genero/genero.js')

//Função para tratar a inserção de um novo filme no DAO

const inserirGenero = async function (genero, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 30
                
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultGenero = await filmeDAO.insertGenero(genero)

                if(resultGenero)
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

const atualizarGenero = async function(id, genero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                    == ''        || id                    == undefined || id                    == null || isNaN(id) ||               id <=0 ||              
                    genero.nome           == ''        || genero.nome           == undefined || genero.nome           == null || genero.nome.length            > 80 
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultGenero = await filmeDAO.selectByIdGenero(parseInt(id))

                    if(resultGenero != false || typeof(resultGenero) == 'object'){
                        if(resultGenero.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            genero.id = parseInt(id)

                            let result = await filmeDAO.updateGenero(genero)

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

const excluirGenero = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultGenero= await filmeDAO.selectByIdGenero(parseInt(id))

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                //Se existir, faremos o delete
                if(resultGenero.length > 0){
                    //delete
                    let result = await filmeDAO.deleteGenero(parseInt(id))

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

const listarGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosGenero = {}
        //Função para retornar os generos cadastrados
        let resultGenero = await filmeDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.items = resultGenero.length
                dadosGenero.films = resultGenero //verificar essa linha "films"

                return dadosGenero
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

const buscarGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosGenero = {}

            let resultGenero = await filmeDAO.selectByIdGenero(parseInt(id))
            console.log(resultGenero)
            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.films = resultGenero //verificar essa linha "films"

                    return dadosGenero //200
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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}