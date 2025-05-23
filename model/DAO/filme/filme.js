/****************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRID de filmes
 * Data: 11/02/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 ***************************************************************************************/
//Import da biblioteca do prisma client para executar os scripts SQL
const{ PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
 const  prisma = new PrismaClient()

//CADA FUNÇÃO REPRESENTA UMA AÇÃO NO BANCO

//Função para inserir um novo filme
const insertFilme = async function(filme){
    //O trycach é necessário para mostrar mensagem de erro ao usuário e não no terminal do desenvolvedor
    //com o console abaixo do (error), o erro aparece tanto para o usuário quanto para o desenvolvedor
    try {

        let sql = `insert into tbl_filme  ( nome,
                                            duracao,
                                            sinopse,
                                            data_lancamento,
                                            foto_capa,
                                            link_trailer,
                                            id_classificacao,
                                            id_idioma
                                        )
                                            values
                                        (
                                            '${filme.nome}',
                                            '${filme.duracao}',
                                            '${filme.sinopse}',
                                            '${filme.data_lancamento}',
                                            '${filme.foto_capa}',
                                            '${filme.link_trailer}',
                                            '${filme.id_classificacao}',
                                            '${filme.id_idioma}'
                                            )`
        //O awai é fundamental para ter comunicação com o BD
        //executa o scriptSQL no Banco de Dados e aguarda o retorno do BD para saber se deu certo
        let result = await prisma.$executeRawUnsafe(sql)

        //A chave se torna opcional quando só tem uma saída de resposta
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

//Função para atualizar um filme existente
const updateFilme = async function(filme){
    try {
        let sql = `update tbl_filme set     nome             = '${filme.nome}',
                                            duracao          = '${filme.duracao}',
                                            sinopse          = '${filme.sinopse}',
                                            data_lancamento  = '${filme.data_lancamento}',
                                            foto_capa        = '${filme.foto_capa}',
                                            link_trailer     = '${filme.link_trailer}',
                                            id_classificacao = '${filme.id_classificacao}',
                                            id_idioma        = '${filme.id_idioma}'
                                where id = ${filme.id}
                                `

        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if(resultFilme)
            return true
        else
          return false
    } catch (error) {
        return false
    }
}

//Função para excluir um filme existente
const deleteFilme = async function(id){
    try {
        let sql = `delete from tbl_filme where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os filmes existentes
const selectAllFilme = async function(){
    
    try {
        //Script sql para retornar todos os dados
        let sql = 'select * from tbl_filme order by id desc'
        
        //Executa o ScriptSQL no Banco de Dados e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
}

//Função para buscar um filme pelo ID
const selectByIdFilme = async function(id){
    try {
        let sql = `select * from tbl_filme where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
        return false
    } catch (error) {
        return false
    }
    
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme
}