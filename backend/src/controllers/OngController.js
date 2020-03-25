const connection = require('../database/connections');
const crypto = require('crypto');

module.exports = {
    /**Para recuperação dos dados */
    async index (request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    /**Para envio dos dados */
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
        //console.log(body)

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id });
    }
};

