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

const insertIdioma = async function(idioma){
    try {

        let sql = `insert into tbl_idioma  ( nome
                                        )
                                        values
                                        (
                                         '${idioma.nome}'
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

const updateIdioma = async function(idioma){
    try {
        let sql = `update tbl_idioma set nome = '${idioma.nome}' 

                                where id = ${idioma.id}
                                `

        let resultIdioma = await prisma.$executeRawUnsafe(sql)

        if(resultIdioma)
            return true
        else
          return false
    } catch (error) {
        return false
    }
}

const deleteIdioma = async function(id){ //Conferir o nome da tabela no workbench
    try {
        let sql = `delete from tbl_idioma where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    } catch (error) {
        return false
    }
}

const selectAllIdioma = async function(){
    
    try {
        //Script sql para retornar todos os dados
        let sql = 'select * from tbl_idioma order by id desc'
        
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

const selectByIdIdioma = async function(id){
    try {
        let sql = `select * from tbl_idioma where id = ${id}`

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
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}