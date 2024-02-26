const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");


class UsersControllers {
    async create(request, response) {

        try {
            
            const { name, email, password, role } = request.body;
    
            const existingUser = await knex("users").where({email}).first();
    
            if(existingUser) {
                throw new AppError("Este e-mail já existe!");
            }
    
            const hashedPassword = await hash(password, 8);
    
            await knex("users").insert({
                name,
                email,
                password: hashedPassword,
                role
            })
            
            return response.json({ name, email, password });

        } catch (error) {
            // Captura qualquer erro lançado dentro do bloco try e trata-o
            return response.status(error.statusCode || 500).json({ error: error.message });
        }

    }
    async update(request, response) {
        
        try {
            const { name, email, password, old_password, role} = request.body;
    
            const user_id = request.user.id;
    
            const user = await knex("users").where({id: user_id}).first();

    
            if(!user) {
                throw new AppError("Usuário não encontrado!");
            }
    
            if(password && !old_password ) {
                throw new AppError("Informe a senha antiga!");
            }
    
            if( password && old_password ) {

                const comparePassword = await compare(old_password, user.password);
    
                if(!comparePassword) {
                    throw new AppError("Usuário e/ou senha incorreto!");
                }
    
                 const newPassword = await hash(password, 8);

                 await knex("users").where({ id: user_id }).update({password: newPassword});
            }
    
            await knex("users").where({id: user_id}).update({
                name: name,
                email: email,
                role: role
            })
    
            return response.json({ name, email, password });
            
        } catch (error) {
            // Captura qualquer erro lançado dentro do bloco try e trata-o
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async index(request, response) {

        const user_id = request.user.id;

        const users = await knex("users").where({ id: user_id }).first();

        return response.json({ users })

    }
    async show(request, response) {

        const users = await knex("users");
        
        return response.json({ users });

    }
}

module.exports = UsersControllers;