const knex = require("../database/knex");

class DishesController {
    async create( request, response ) {
        const { name, category, ingredients, price, description } = request.body;

        const user = await knex("dishes").insert({
        	name,
            category,
            ingredients,
            price,
            description
        })

        return response.json({
            user
        })
    }

    async update( request, response ) {
        const { name, category, ingredients, price, description } = request.body;

        const { id_dishe } = request.params;

        console.log(id_dishe);

        //const dishes = await knex("dishes").where({ id: id_dishes });

        await knex("dishes").where({ id: id_dishe }).update({
            name, 
            category, 
            ingredients, 
            price, 
            description
        });


        return response.json();
    }

    async index( request, response ) {
        const { id_dishe } = request.params;

        const dishes = await knex("dishes").where({ id: id_dishe });

        return response.json({ dishes });

    }

    async show( request, response ) {

        const showDishes = await knex("dishes").where({ id: 1});

        console.log(showDishes);

        return response.json({ showDishes });
    }
}

module.exports = DishesController;