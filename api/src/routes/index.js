const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { findByName , findById , findDogTemperament , createDog, deleteDog} = require('../controllers/dogs.controller');
const router = Router();



// Configurar los routers
router.get('/dogs', findByName ); 
//router.get(`/dogs?&name="..."`, findByName); // arme las funciones para que las dos primeras rutas se puedan hacer en un solo get, por eso esta se comenta
router.get('/temperament', findDogTemperament);
router.get('/dogs/:id', findById);

router.post('/dogs', createDog);

router.delete('/dogs', deleteDog)

module.exports = router;
