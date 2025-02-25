/*************************************************************************************
 * Objetivo: Arquivo de configuração para padronizar mensagens e status code da API
 * Data: 18/02/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 ************************************************************************************/

/************************************ STATUS CODE DE MENSAGEM DE ERRO ***************************************/
const ERROR_REQUIRED_FIELDS            = {status: false, status_code: 400, message: "Não foi possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!!!"}
const ERROR_INTERNAL_SERVER_MODEL      = {status: false, status_code: 500, message: "Devido a erros internos no servidor da MODEL, não foi possível processar a requisição!!!"}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: "Devido a erros internos no servidor da CONTROLLER, não foi possível processar a requisição!!!"}
const ERROR_CONTENT_TYPE               = {status: false, status_code: 415, message: "Não foi possível processar a requisição, pois o tipo de dado encaminhado não é processado pelo servidor. Favor encaminhar dados apenas no formato JSON!!!"}
const ERROR_NOT_FOUND                  = {status: false, status_code: 404, message: "Não foram encontrados itens de retorno!!!"}
/*********************************** STATUS CODE DE MENSAGENS DE SUCESSO  **********************************/
const SUCESS_CREATED_ITEM =  {status: true, status_code: 201, message: "Item criado com sucesso!!!"}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_CREATED_ITEM
}
