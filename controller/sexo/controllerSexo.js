/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/sexo/sexo.js')

//Função para tratar a inserção de um novo filme no DAO

const inserirSexo = async function(sexo, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (sexo.masculino   == ''        || sexo.masculino == undefined || sexo.masculino   == null || sexo.masculino.length      > 9 || 
                sexo.feminino    == ''        || sexo.feminino  == undefined || sexo.feminino    == null || sexo.feminino.length       > 8 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultSexo = await filmeDAO.insertSexo(sexo)

                if(resultSexo)
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

const atualizarSexo = async function(id, sexo, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id               == ''        || id             == undefined || id               == null || isNaN(id) ||           id <=0  ||              
                    sexo.masculino   == ''        || sexo.masculino == undefined || sexo.masculino   == null || sexo.masculino.length      > 9 || 
                    sexo.feminino    == ''        || sexo.feminino  == undefined || sexo.feminino    == null || sexo.feminino.length       > 8 
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultSexo = await filmeDAO.selectByIdSexo(parseInt(id))

                    if(resultSexo != false || typeof(resultSexo) == 'object'){
                        if(resultSexo.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            sexo.id = parseInt(id)

                            let result = await filmeDAO.updateSexo(sexo)

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

const excluirSexo = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultSexo = await filmeDAO.selectByIdSexo(parseInt(id))

            if(resultSexo != false || typeof(resultSexo) == 'object'){
                //Se existir, faremos o delete
                if(resultSexo.length > 0){
                    //delete
                    let result = await filmeDAO.deleteSexo(parseInt(id))

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
const listarSexo = async function(){
    try {
        //Objeto do tipo JSON
        let dadosSexo = {}
        //Função para retornar os filmes cadastrados
        let resultSexo = await filmeDAO.selectAllSexo()

        if(resultSexo != false || typeof(resultSexo) == 'object'){
            if(resultSexo.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosSexo.status = true
                dadosSexo.status_code = 200
                dadosSexo.items = resultSexo.length
                dadosSexo.films = resultSexo

                return dadosSexo
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

const buscarSexo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosSexo = {}

            let resultSexo = await filmeDAO.selectByIdSexo(parseInt(id))
            console.log(resultSexo)
            if(resultSexo != false || typeof(resultSexo) == 'object'){
                if(resultSexo.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.films = resultSexo

                    return dadosSexo //200
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
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexo,
    buscarSexo
}