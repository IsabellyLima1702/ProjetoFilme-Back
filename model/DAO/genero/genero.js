/****************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRID de filmes
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 ***************************************************************************************/
//Import da biblioteca do prisma client para executar os scripts SQL
const{ PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
 const  prisma = new PrismaClient()

//CADA FUNÇÃO REPRESENTA UMA AÇÃO NO BANCO

const insertGenero = async function(genero){
    try {

        let sql = `insert into tbl_genero  ( nome
                                        )
                                        values
                                        (
                                         '${genero.nome}'
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

const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set nome = '${genero.nome}'

                                where id = ${genero.id}
                                `

        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if(resultGenero)
            return true
        else
          return false
    } catch (error) {
        return false
    }
}

const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    } catch (error) {
        return false
    }
}

const selectAllGenero = async function(){
    
    try {
        //Script sql para retornar todos os dados
        let sql = 'select * from tbl_genero order by id desc'
        
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

const selectByIdGenero = async function(id){
    try {
        let sql = `select * from tbl_genero where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
        return false
    } catch (error) {
        return false
    }
    
}

//Função para retornar os filmes pelo gênero
const selectFilmeByIdGenero = async function(idGenero){
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                                                inner join tbl_filme_genero
                                                    on tbl_filme.id = tbl_filme_genero.id_filme
                                                inner join tbl_genero
                                                    on tbl_genero.id = tbl_filme_genero.id_genero

         where tbl_filme_genero.id_genero = ${idGenero}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
        return false
    } catch (error) {
        return false
    }
}

//Função para retornar os gêneros pelo filme
const selectGeneroByIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_genero.* from tbl_filme 
                                                inner join tbl_filme_genero
                                                    on tbl_filme.id = tbl_filme_genero.id_filme
                                                inner join tbl_genero
                                                    on tbl_genero.id = tbl_filme_genero.id_genero

         where tbl_filme_genero.id_filme = ${idFilme}`
         
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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero,
    selectByIdGenero,
    selectFilmeByIdGenero,
    selectGeneroByIdFilme
}