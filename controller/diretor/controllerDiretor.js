/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/diretor/diretor.js')
const controllerSexo = require('../sexo/controllerSexo.js')

//Função para tratar a inserção de um novo filme no DAO

const inserirDiretor = async function(diretor, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if ( diretor.nome             == ''        || diretor.nome             == undefined || diretor.nome             == null ||diretor.nome.length              > 50  || 
                 diretor.contato          == ''        || diretor.contato          == undefined || diretor.contato          == null || diretor.contato.length          > 30  ||  
                 diretor.data_nascimento  == ''        || diretor.data_nascimento  == undefined || diretor.data_nascimento  == null || diretor.data_nascimento.length  > 20  ||  
                 diretor.biografia        == ''        || diretor.biografia        == undefined || diretor.biografia        == null || diretor.biografia.length        > 300 ||
                 diretor.id_sexo          == ''        || diretor.id_sexo          == undefined 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultDiretor = await filmeDAO.insertDiretor(diretor)

                if(resultDiretor)
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

const atualizarDiretor = async function(id, diretor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
    
                if (id                       == ''        || id                       == undefined || id                       == null || isNaN(id) ||                 id <=0   ||              
                    diretor.nome             == ''        || diretor.nome             == undefined || diretor.nome             == null || diretor.nome.length             > 50  || 
                    diretor.contato          == ''        || diretor.contato          == undefined || diretor.contato          == null || diretor.contato.length          > 30  ||  
                    diretor.data_nascimento  == ''        || diretor.data_nascimento  == undefined || diretor.data_nascimento  == null || diretor.data_nascimento.length  > 20  ||  
                    diretor.biografia        == ''        || diretor.biografia        == undefined || diretor.biografia        == null || diretor.biografia.length        > 300 ||
                    diretor.id_sexo          == ''        || diretor.id_sexo          == undefined

                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no Banco de Dados
                    let resultDiretor = await filmeDAO.selectByIdDiretor(parseInt(id))

                    if(resultDiretor != false || typeof(resultDiretor) == 'object'){
                        if(resultDiretor.length > 0){
                            //Update
                            //Adiciona o ID do filme no JSON com os dados
                            diretor.id = parseInt(id)

                            let result = await filmeDAO.updateDiretor(diretor)

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

const excluirDiretor = async function(id){
    try {
       if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return message.ERROR_REQUIRED_FIELDS //400
       }else{

            //Função que verifica se o ID existe no Banco de Dados
            let resultDiretor = await filmeDAO.selectByIdDiretor(parseInt(id))

            if(resultDiretor != false || typeof(resultDiretor) == 'object'){
                //Se existir, faremos o delete
                if(resultDiretor.length > 0){
                    //delete
                    let result = await filmeDAO.deleteDiretor(parseInt(id))

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
const listarDiretor = async function(){
    try {

        let arrayDiretor = []
        //Objeto do tipo JSON
        let dadosDiretor = {}
        //Função para retornar os filmes cadastrados
        let resultDiretor = await filmeDAO.selectAllDiretor()

        if(resultDiretor != false || typeof(resultDiretor) == 'object'){
            if(resultDiretor.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosDiretor.status = true
                dadosDiretor.status_code = 200
                dadosDiretor.items = resultDiretor.length

                for(const itemDiretor of resultDiretor){
                    let dadosSexo = await controllerSexo.buscarSexo(itemDiretor.id_sexo)

                    itemDiretor.sexo = dadosSexo.sexo

                    delete itemDiretor.id_sexo

                    arrayDiretor.push(itemDiretor)
                }
                dadosDiretor.films = arrayDiretor

                return dadosDiretor
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

const buscarDiretor = async function(id){
    try {

        let arrayDiretor = []

        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosDiretor = {}

            let resultDiretor = await filmeDAO.selectByIdDiretor(parseInt(id))
            console.log(resultDiretor)
            if(resultDiretor != false || typeof(resultDiretor) == 'object'){
                if(resultDiretor.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosDiretor.status = true
                    dadosDiretor.status_code = 200
                    
                    for(const itemDiretor of resultDiretor){
                    let dadosSexo = await controllerSexo.buscarSexo(itemDiretor.id_sexo)

                    itemDiretor.sexo = dadosSexo.sexo

                    delete itemDiretor.id_sexo

                    arrayDiretor.push(itemDiretor)
                }
                dadosDiretor.films = arrayDiretor

                    return dadosDiretor //200
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
    inserirDiretor,
    atualizarDiretor,
    excluirDiretor,
    listarDiretor,
    buscarDiretor
}