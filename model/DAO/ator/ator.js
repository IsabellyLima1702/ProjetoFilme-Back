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

const insertAtor = async function(ator){
    //O trycach é necessário para mostrar mensagem de erro ao usuário e não no terminal do desenvolvedor
    //com o console abaixo do (error), o erro aparece tanto para o usuário quanto para o desenvolvedor
    try {

        let sql = `insert into tbl_ator ( nome,
                                          contato,
                                          data_nascimento,
                                          biografia
                                        )
                                            values
                                        (
                                            '${ator.nome}',
                                            '${ator.contato}',
                                            '${ator.data_nascimento}',
                                            '${ator.biografia}'

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

const updateAtor = async function(ator){
    try {
        let sql = `update tbl_atores set nome = '${ator.nome}',
                                         contato = '${ator.contato}',
                                         data_nascimento = '${ator.data_nascimento}',
                                         biografia = '${ator.biografia}',
                                                    

                                where id = ${ator.id}
                                `

        let resultAtor = await prisma.$executeRawUnsafe(sql)

        if(resultAtor)
            return true
        else
          return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteAtor = async function(id){
    try {
        let sql = `delete from tbl_atores where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
    } catch (error) {
        return false
    }
}

const selectAllAtor = async function(){
    
    try {
        //Script sql para retornar todos os dados
        let sql = 'select * from tbl_atores order by id desc'
        
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

const selectByIdAtor = async function(id){
    try {
        let sql = `select * from tbl_atores where id = ${id}`

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
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtor,
    selectByIdAtor
}