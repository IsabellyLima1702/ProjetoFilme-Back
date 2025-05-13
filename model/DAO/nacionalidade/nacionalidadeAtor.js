/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 22/04/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
const { insertNacionalidadeAtor } = require('../filmeDiretor')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertNacionalidadeAtor = async function(nacionalidadeAtor){
  try {

      let sql = `insert into tbl_nacionalidade_atores  ( 
                                          id_nacionalidade,
                                          id_atores
                                        ) 
                                          values 
                                        (
                                          ${nacionalidadeAtor.id_nacionalidade},
                                          ${nacionalidadeAtor.id_atores}
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
const updateNacionalidadeAtor = async function(nacionalidadeAtor){
  try {
      let sql = `update tbl_nacionalidade_atores set    id_nacionalidade   = ${nacionalidadeAtor.id_nacionalidade},
                                                        id_atores          = ${nacionalidadeAtor.id_atores}
                                        
                            where id = ${nacionalidadeAtor.id}                
                            `
      let resultNacionalidadeAtor = await prisma.$executeRawUnsafe(sql)

      if(resultNacionalidadeAtor)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteNacionalidadeAtor = async function(id){
  try {
    let sql = `delete from tbl_nacionalidade_atores where id = ${id}`

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
const selectAllNacionalidadeAtor = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_nacionalidade_atores order by id desc'

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
const selectByIdNacionalidadeAtor = async function(id){
  try {
    let sql = `select * from tbl_nacionalidade_atores where id = ${id}`

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
const selectNacionalidadeByIdAtor = async function(idAtor){
  try {
      let sql = `select tbl_nacionalidade.* from tbl_nacionalidade
                                            inner join tbl_nacionalidade_atores
                                              on tbl_nacionalidade.id = tbl_nacionalidade_atores.id_nacionalidade
                                            inner join tbl_atores
                                              on tbl_atores.id = tbl_nacionalidade_atores.id_atores
                  where tbl_nacionalidade_atores.id_atores = ${idAtor}`

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
const selectAtorByIdNacionalidade = async function(idNacionalidade){
 try { //verificar se é certo esse ponto antes do *
      let sql = `select tbl_atores.* from tbl_nacionalidade 
                                            inner join tbl_nacionalidade_atores
                                              on tbl_atores.id = tbl_nacionalidade_atores.id_nacionalidade
                                            inner join tbl_ator
                                              on tbl_atores.id = tbl_nacionalidade_atores.id_atores
                  where tbl_nacionalidade_atores.id_nacionalidade = ${idNacionalidade}`
                  
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
    insertNacionalidadeAtor,
    updateNacionalidadeAtor,
    deleteNacionalidadeAtor,
    selectAllNacionalidadeAtor,
    selectByIdNacionalidadeAtor,
    selectNacionalidadeByIdAtor,
    selectAtorByIdNacionalidade
} 