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
const inserirFilme = async function(filme){
    if (filme.nome            == ''        || filme.nome            == undefined || filme.nome            == null || filme.nome.length            > 80 || 
        filme.duracao         == ''        || filme.duracao         == undefined || filme.duracao         == null || filme.nome.length            > 5  ||
        filme.sinopse         == ''        || filme.sinopse         == undefined || filme.sinopse         == null ||
        filme.data_lancamento == ''        || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
        filme.foto_capa       == undefined || filme.foto_capa.length    > 200    ||
        filme.link_trailer    == undefined || filme.link_trailer.length > 200 
    )
    {
       return message.ERROR_REQUIRED_FIELDS // 400
    }else{
        //Chama a função para inserir no banco de dados e aguarda o retorno da função
        let resultFilme = await filmeDAO.insertFilme(filme)

        if(resultFilme)
            return message.SUCESS_CREATED_ITEM //201
        else
            return message.ERROR_INTERNAL_SERVER //500
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
    
}

//Função para tratar o retorno de um filme filtrando pelo ID do DAO
const buscarFilme = async function(){
    
}

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}