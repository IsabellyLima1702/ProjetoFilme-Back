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
const insertFilmeDiretor = async function(FilmeDiretor){
  try {

      let sql = `insert into tbl_filme_diretor  ( 
                                          id_filme,
                                          id_diretor
                                        ) 
                                          values 
                                        (
                                          ${FilmeDiretor.id_filme},
                                          ${FilmeDiretor.id_diretor}
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
const updateFilmeDiretor = async function(FilmeDiretor){
  try {
      let sql = `update tbl_filme_diretor set        id_filme       = ${FilmeDiretor.id_filme},
                                                    id_diretor      = ${FilmeDiretor.id_diretor}
                                        
                            where id = ${FilmeDiretor.id}                
                            `
      let resultFilmeDiretor = await prisma.$executeRawUnsafe(sql)

      if(resultFilmeDiretor)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteFilmeDiretor = async function(id){
  try {
    let sql = `delete from tbl_filme_diretor where id = ${id}`

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
const selectAllFilmeDiretor = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_diretor order by id desc'

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
const selectByIdFilmeDiretor = async function(id){
  try {
    let sql = `select * from tbl_filme_diretor where id = ${id}`

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
const selectFilmeByIdDiretor = async function(idGenero){
  try {
      let sql = `select tbl_filme.* from tbl_filme 
                                            inner join tbl_filme_diretor
                                              on tbl_filme.id = tbl_filme_diretor.id_filme
                                            inner join tbl_diretor
                                              on tbl_diretor.id = tbl_filme_diretor.id_diretor
                  where tbl_filme_diretor.id_diretor = ${idGenero}`

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
const selectDiretorByIdFilme = async function(idFilme){
 try { //verificar se é certo esse ponto antes do *
      let sql = `select tbl_diretor.* from tbl_filme 
                                            inner join tbl_filme_diretor
                                              on tbl_filme.id = tbl_filme_diretor.id_filme
                                            inner join tbl_diretor
                                              on tbl_diretor.id = tbl_filme_diretor.id_diretor
                  where tbl_filme_diretor.id_filme = ${idFilme}`
                  
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
    insertFilmeDiretor,
    updateFilmeDiretor,
    deleteFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    selectFilmeByIdDiretor,
    selectDiretorByIdFilme
} 
