// config/multer.js

const multer = require('multer');

// Configurer le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    console.log("start it")

        cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
    },
    
    filename: function (req, file, cb) {
    console.log("start it================================")
        // Générer un nom de fichier unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
        console.log("ici commence l'upload "+file.fieldname)
    }
});

// Créer l'instance multer avec la configuration de stockage
const upload = multer({ storage: storage });

module.exports = upload;
