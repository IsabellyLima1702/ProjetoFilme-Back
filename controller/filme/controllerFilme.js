/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquivo para realizar o CRUD de dados no Banco de dados
const filmeDAO = require('../../model/DAO/filme.js')

//Função para tratar a inserção de um novo filme no DAO
const inserirFilme = async function(filme, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
        {

            if (filme.nome            == ''        || filme.nome            == undefined || filme.nome            == null || filme.nome.length            > 80 || 
                filme.duracao         == ''        || filme.duracao         == undefined || filme.duracao         == null || filme.duracao.length         > 5  ||
                filme.sinopse         == ''        || filme.sinopse         == undefined || filme.sinopse         == null ||
                filme.data_lancamento == ''        || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
                filme.foto_capa       == undefined || filme.foto_capa.length    > 200    ||
                filme.link_trailer    == undefined || filme.link_trailer.length > 200 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no banco de dados e aguarda o retorno da função
                let resultFilme = await filmeDAO.insertFilme(filme)

                if(resultFilme)
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
const atualizarFilme = async function(){
    
}

//Função para tratar a exclusão de um filme no DAO
const excluirFilme = async function(){
    
}

//Função para tratar o retorno de uma lista de filmes do DAO
const listarFilme = async function(){
    try {
        //Objeto do tipo JSON
        let dadosFilme = {}
        //Função para retornar os filmes cadastrados
        let resultFilme = await filmeDAO.selectAllFilme()

        if(resultFilme != false || typeof(resultFilme) == 'object'){
            if(resultFilme.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.items = resultFilme.length
                dadosFilme.films = resultFilme

                return dadosFilme
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
const buscarFilme = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosFilme = {}

            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))
            console.log(resultFilme)
            if(resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.films = resultFilme

                    return dadosFilme //200
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
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}