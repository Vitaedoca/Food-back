
exports.up = knex => knex.schema.createTable("dishes", table => {

    table.increments("id");
    table.text("name");
    table.text("category");
    table.text("ingredients");
    table.text("price");
    table.text("description");
    table.text("image");
})


exports.down = knex => knex.schema.dropTable("dishes");