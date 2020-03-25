/**Conexão com o banco:
 * 
 * importamos o knex
 * depois o modulo de configuração do knex file
 * 
 * dai chamamos o knex passamos o arquivo knexfile especificando o modulo de 
 * desenvolvedor. Ficando assim:
 * 
 */
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;