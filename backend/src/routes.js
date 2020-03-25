const express = require('express');
const routes = express.Router();

/**Importando o arquivo que contem os metodos HTTP */
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/**Login */
routes.post('/session', SessionController.create);

/**Ongs */
/**Para recuperação dos dados */
routes.get('/ongs', OngController.index);
/**Para envio dos dados */
routes.post('/ongs', OngController.create)

/**Recuperação de casos de ONG específica */
routes.get('/profile', ProfileController.index);

/**Incidents */
/**Para recuperação dos dados */
routes.get('/incidents', IncidentController.index);
/**Para envio dos dados */
routes.post('/incidents', IncidentController.create)
/**Deleta um caso específico */
routes.delete('/incidents/:id', IncidentController.delete)
/**Lista caso específico */

module.exports = routes;