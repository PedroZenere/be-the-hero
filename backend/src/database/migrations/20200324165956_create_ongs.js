/**Será executado quando chamar esse arquivo */
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
      table.string('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()
  });
};

/**Se der merda, executa isso */
exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};

/**Para criar este arquivo: npx knex migrate:make create_{nome} */
/**Para rodar esse scrip: npx knex migrate:latest */
