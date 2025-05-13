/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/ator/ator.js')

//Função para tratar a inserção de um novo filme no DAO

const inserirAtor = async function(ator, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (ator.nome                 == ''        || ator.nome               == undefined || ator.nome                   == null || ator.nome.length            > 50 || 
                ator.contato              == ''        || ator.contato            == undefined || ator.contato                == null || ator.contato.length         > 30 ||
                ator.data_nascimento      == ''        || ator.data_nascimento    == undefined || ator.data_nascimento        == null || ator.data_nascimento.length > 20 ||
                ator.biografia            == ''        || ator.biografia          == undefined || ator.biografia              == null || ator.biografia.length       > 300 

            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultAtor = await filmeDAO.insertAtor(ator)

                if(resultAtor)
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

const atualizarAtor = async function(id, ator, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                    == ''        || id                    == undefined || id                    == null || isNaN(id) ||          id    <=0  ||              
                    categorias.nome       == ''        || categorias.nome       == undefined || categorias.nome       == null || categorias.nome.length      > 50 || 
                    ator.contato          == ''        || ator.contato          == undefined || ator.contato          == null || ator.contato.length         > 30 ||
                    ator.data_nascimento  == ''        || ator.data_nascimento  == undefined || ator.data_nascimento  == null || ator.data_nascimento.length > 20 ||
                    ator.biografia        == ''        || ator.biografia        == undefined || ator.biografia        == null || ator.biografia.length       > 300 
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultAtor = await filmeDAO.selectByIdAtor(parseInt(id))

                    if(resultAtor != false || typeof(resultAtor) == 'object'){
                        if(resultAtor.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            ator.id = parseInt(id)

                            let result = await filmeDAO.updateAtor(ator)

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

const excluirAtor = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultAtor = await filmeDAO.selectByIdAtor(parseInt(id))

            if(resultAtor != false || typeof(resultAtor) == 'object'){
                //Se existir, faremos o delete
                if(resultAtor.length > 0){
                    //delete
                    let result = await filmeDAO.deleteAtor(parseInt(id))

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
const listarAtor = async function(){
    try {
        //Objeto do tipo JSON
        let dadosAtor = {}
        //Função para retornar os filmes cadastrados
        let resultAtor = await filmeDAO.selectAllAtor()

        if(resultAtor != false || typeof(resultAtor) == 'object'){
            if(resultAtor.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosAtor.status = true
                dadosAtor.status_code = 200
                dadosAtor.items = resultAtor.length
                dadosAtor.films = resultAtor

                return dadosAtor
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

const buscarAtor = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosAtor = {}

            let resultAtor = await filmeDAO.selectByIdAtor(parseInt(id))
            console.log(resultAtor)
            if(resultAtor != false || typeof(resultAtor) == 'object'){
                if(resultAtor.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosAtor.status = true
                    dadosAtor.status_code = 200
                    dadosAtor.films = resultAtor

                    return dadosAtor //200
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
    inserirAtor,
    atualizarAtor,
    excluirAtor,
    listarAtor,
    buscarAtor
}