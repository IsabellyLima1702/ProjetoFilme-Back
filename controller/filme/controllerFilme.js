/**************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 *************************************************************************************/

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
        response.status_code = 400
        response.message = 'Os atributos informados na requisição não estão de acordo. Ex: Campos obrigatórios, Quantidade de caracteries...'
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