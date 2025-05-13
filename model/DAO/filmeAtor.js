/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertFilmeAtor = async function(FilmeAtor){
  try {

      let sql = `insert into tbl_filme_atores  ( 
                                          id_filme,
                                          id_atores
                                        ) 
                                          values 
                                        (
                                          ${FilmeAtor.id_filme},
                                          ${FilmeAtor.id_atores}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateFilmeAtor = async function(FilmeAtor){
  try {
      let sql = `update tbl_filme_atores set     id_filme      = ${FilmeAtor.id_filme},
                                                 id_atores     = ${FilmeAtor.id_atores}
                                        
                            where id = ${FilmeAtor.id}                
                            `
      let resultFilmeAtor = await prisma.$executeRawUnsafe(sql)

      if(resultFilmeAtor)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteFilmeAtor = async function(id){
  try {
    let sql = `delete from tbl_filme_atores where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllFilmeAtor = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_atores order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdFilmeAtor = async function(id){
  try {
    let sql = `select * from tbl_filme_atores where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os filmes pelo genero
const selectFilmeByIdAtor = async function(idAtor){
  try {
      let sql = `select tbl_filme.* from tbl_filme 
                                            inner join tbl_filme_atores
                                              on tbl_filme.id = tbl_filme_atores.id_filme
                                            inner join tbl_atores
                                              on tbl_atores.id = tbl_filme_atores.id_atores
                  where tbl_filme_atores.id_atores = ${idAtor}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pelo Filme
const selectAtorByIdFilme = async function(idFilme){
 try { //verificar se é certo esse ponto antes do *
      let sql = `select tbl_atores.* from tbl_filme 
                                            inner join tbl_filme_atores
                                              on tbl_filme.id = tbl_filme_atores.id_filme
                                            inner join tbl_atores
                                              on tbl_atores.id = tbl_filme_atores.id_atores
                  where tbl_filme_atores.id_filme = ${idFilme}`
                  
      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}


module.exports = {
    insertFilmeAtor,
    updateFilmeAtor,
    deleteFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    selectFilmeByIdAtor,
    selectAtorByIdFilme
} 