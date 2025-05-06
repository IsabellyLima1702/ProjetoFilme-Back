/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/idioma/idioma.js')

//Função para tratar a inserção de um novo filme no DAO


const inserirIdioma = async function (idioma, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (idioma.nome == '' || idioma.nome == undefined || idioma.nome == null || idioma.nome.length > 80
                
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultIdioma = await filmeDAO.insertIdioma(idioma)

                if(resultIdioma)
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

const atualizarIdioma = async function(id, idioma, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id             == ''  || id             == undefined || id            == null || isNaN(id) ||         id <=0 ||              
                    idioma.nome    == ''  || idioma.nome    == undefined || idioma.nome   == null || idioma.nome.length > 80
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultIdioma = await filmeDAO.selectByIdIdioma(parseInt(id))

                    if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                        if(resultIdioma.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            idioma.id = parseInt(id)

                            let result = await filmeDAO.updateIdioma(idioma)

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

const excluirIdioma = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultIdioma = await filmeDAO.selectByIdIdioma(parseInt(id))

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                //Se existir, faremos o delete
                if(resultIdioma.length > 0){
                    //delete
                    let result = await filmeDAO.deleteIdioma(parseInt(id))

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

const listarIdioma = async function(){
    try {
        //Objeto do tipo JSON
        let dadosIdioma = {}
        //Função para retornar os generos cadastrados
        let resultIdioma = await filmeDAO.selectAllIdioma()

        if(resultIdioma != false || typeof(resultIdioma) == 'object'){
            if(resultIdioma.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosIdioma.status = true
                dadosIdioma.status_code = 200
                dadosIdioma.items = resultIdioma.length
                dadosIdioma.films = resultIdioma //verificar essa linha "films"

                return dadosIdioma
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

const buscarIdioma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosIdioma = {}

            let resultIdioma = await filmeDAO.selectByIdIdioma(parseInt(id))
            console.log(resultIdioma)
            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                if(resultIdioma.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosIdioma.status = true
                    dadosIdioma.status_code = 200
                    dadosIdioma.films = resultIdioma //verificar essa linha "films"

                    return dadosIdioma //200
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
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma,
    listarIdioma,
    buscarIdioma
}