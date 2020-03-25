const connection = require('../database/connections');

module.exports = {
    /**Para recuperação dos dados */
    async index (request, response) {
        /**conta o total de casos que existem 
         * [] pega a primeira posiçao do array
        */
        const [count] = await connection('incidents').count()

        /**Paginação */
        const { page = 1 } = request.query;

        /**Mostrar os incidentes junto com informações da ONG */
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1) * 5)
        .select(['incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);

        /**Retorna a contagem do total de casos pelo cabeçalho */
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    /**Para envio dos dados */
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization
    
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        /**
         * Pega o id do caso
         * Pega o id da ONG
         */
        const { id } = request.params
        const ong_id = request.headers.authorization

        /**Verifica se a ONG possui algum caso
         * e se possui o caso que esta sendo deletado
         */
        const incidents = await connection('incidents')
        .select('ong_id')
        .where('id', id)
        .first();
        
        /**Verifica se a ONG possui algum caso*/
        if(incidents.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'})
        }
        
        await connection('incidents').where('id', id).delete()

        return response.status(204).send();
    }, 

};