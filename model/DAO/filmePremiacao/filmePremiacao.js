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
const insertFilmePremiacao = async function(filmePremiacao){
  try {

      let sql = `insert into tbl_filme_premiacoes  ( 
                                          id_filme,
                                          id_premiacoes
                                        ) 
                                          values 
                                        (
                                          ${filmePremiacao.id_filme},
                                          ${filmePremiacao.id_premiacoes}
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
const updateFilmePremiacao = async function(filmePremiacao){
  try {
      let sql = `update tbl_filme_premiacoes set    id_filme       = ${filmePremiacao.id_filme},
                                                    id_premiacoes  = ${filmePremiacao.id_premiacoes}
                                        
                            where id = ${filmePremiacao.id}                
                            `
      let resultFilmePremiacao = await prisma.$executeRawUnsafe(sql)

      if(resultFilmePremiacao)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteFilmePremiacao = async function(id){
  try {
    let sql = `delete from tbl_filme_premiacoes where id = ${id}`

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
const selectAllFilmePremiacao = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_premiacoes order by id desc'

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
const selectByIdFilmePremiacoes = async function(id){
  try {
    let sql = `select * from tbl_filme_premiacoes where id = ${id}`

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
const selectFilmeByIdPremiacoes = async function(idPremiacoes){
  try {
      let sql = `select tbl_filme.* from tbl_filme 
                                            inner join tbl_filme_premiacoes
                                              on tbl_filme.id = tbl_filme_premiacoes.id_filme
                                            inner join tbl_premiacoes
                                              on tbl_premiacoes.id = tbl_filme_premiacoes.id_premiacoes
                  where tbl_filme_premiacoes.id_premiacoes = ${idPremiacoes}`

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
const selectPremiacaoByIdFilme = async function(idPremiacao){
 try {
      let sql = `select tbl_premiacoes.* from tbl_filme 
                                            inner join tbl_filme_premiacoes
                                              on tbl_filme.id = tbl_filme_premiacoes.id_filme
                                            inner join tbl_premiacoes
                                              on tbl_premiacoes.id = tbl_filme_premiacoes.id_premiacoes
                  where tbl_filme_premiacoes.id_filme = ${idPremiacao}`
                  
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
    insertFilmePremiacao,
    updateFilmePremiacao,
    deleteFilmePremiacao,
    selectAllFilmePremiacao,
    selectByIdFilmePremiacoes,
    selectFilmeByIdPremiacoes,
    selectPremiacaoByIdFilme
} 