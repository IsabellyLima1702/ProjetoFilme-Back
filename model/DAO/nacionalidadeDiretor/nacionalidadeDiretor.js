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
const insertNacionalidadeDiretor = async function(nacionalidadeDiretor){
  try {

      let sql = `insert into tbl_nacionalidade_diretor  ( 
                                          id_nacionalidade,
                                          id_diretor
                                        ) 
                                          values 
                                        (
                                          ${nacionalidadeDiretor.id_nacionalidade},
                                          ${nacionalidadeDiretor.id_diretor}
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
const updateNacionalidadeDiretor = async function(nacionalidadeDiretor){
  try {
      let sql = `update tbl_nacionalidade_diretor set     id_nacionalidade      = ${nacionalidadeDiretor.id_nacionalidade},
                                                 id_diretor     = ${filmeDiretor.id_diretor}
                                        
                            where id = ${nacionalidadeDiretor.id}                
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
const deleteNacionalidadeDiretor = async function(id){
  try {
    let sql = `delete from tbl_nacionalidade_diretor where id = ${id}`

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
const selectAllNacionalidadeDiretor = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_nacionalidade_diretor order by id desc'

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
const selectByIdNacionalidadeDiretor = async function(id){
  try {
    let sql = `select * from tbl_nacionalidade_diretor where id = ${id}`

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
const selectNacionalidadeByIdDiretor = async function(idDiretor){
  try {
      let sql = `select tbl_nacionalidade.* from tbl_nacionalidade
                                            inner join tbl_nacionalidade_diretor
                                              on tbl_nacionalidade.id = tbl_nacionalidade_diretor.id_nacionalidade
                                            inner join tbl_diretor
                                              on tbl_diretor.id = tbl_nacionalidade_diretor.id_diretor
                  where tbl_nacionalidade_diretor.id_diretor = ${idDiretor}`

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
const selectDiretorByIdNacionalidade = async function(idNacionalidade){
 try { //verificar se é certo esse ponto antes do *
      let sql = `select tbl_diretor.* from tbl_nacionalidade 
                                            inner join tbl_nacionalidade_diretor
                                              on tbl_nacionalidade.id = tbl_nacionalidade_diretor.id_nacionalidade
                                            inner join tbl_diretor
                                              on tbl_diretor.id = tbl_nacionalidade_diretor.id_diretor
                  where tbl_nacionalidade_diretor.id_nacionalidade = ${idNacionalidade}`
                  
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
    insertNacionalidadeDiretor,
    updateNacionalidadeDiretor,
    deleteNacionalidadeDiretor,
    selectAllNacionalidadeDiretor,
    selectByIdNacionalidadeDiretor,
    selectNacionalidadeByIdDiretor,
    selectDiretorByIdNacionalidade
} 