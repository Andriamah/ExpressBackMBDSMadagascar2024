var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyTokenProf(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'Aucun token fourni.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Échec de l\'authentification du token.' });

    // Vérifier la présence de id_matiere
    if (!decoded.id_matiere) {
      return res.status(401).send({ auth: false, message: 'Accès non autorisé. Zone réservée aux professeurs.' });
    }

    // Si tout est bon, enregistrer les informations du token dans la requête pour une utilisation dans d'autres routes
    req.userId = decoded.id;
    req.userMatiereId = decoded.id_matiere;

    next();
  });
}

module.exports = verifyTokenProf;
