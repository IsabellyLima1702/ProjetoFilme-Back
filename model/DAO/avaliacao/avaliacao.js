/****************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRID de filmes
 * Data: 06/05/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 ***************************************************************************************/
//Import da biblioteca do prisma client para executar os scripts SQL
const{ PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
 const  prisma = new PrismaClient()

//CADA FUNÇÃO REPRESENTA UMA AÇÃO NO BANCO

const insertAvaliacao= async function(avaliacao){
    //O trycach é necessário para mostrar mensagem de erro ao usuário e não no terminal do desenvolvedor
    //com o console abaixo do (error), o erro aparece tanto para o usuário quanto para o desenvolvedor
    try {

        let sql = `insert into tbl_avaliacao  ( nota,
                                                id_filme
                                        )
                                            values
                                        (
                                            '${avaliacao.nota}',
                                            '${avaliacao.id_filme}'
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

const updateAvaliacao = async function(avaliacao){
    try {
        let sql = `update tbl_avaliacao set nota = '${avaliacao.nota}',
                                             id_filme = '${avaliacao.id_filme}'
                                                    

                                where id = ${avaliacao.id}
                                `

        let resultAvaliacao = await prisma.$executeRawUnsafe(sql)

        if(resultAvaliacao)
            return true
        else
          return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteAvaliacao = async function(id){
    try {
        let sql = `delete from tbl_avaliacao where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    } catch (error) {
        return false
    }
}

const selectAllAvaliacao = async function(){
    
    try {
        //Script sql para retornar todos os dados
        let sql = 'select * from tbl_avaliacao order by id desc'
        
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

const selectByIdAvaliacao = async function(id){
    try {
        let sql = `select * from tbl_avaliacao where id = ${id}`

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
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao
}