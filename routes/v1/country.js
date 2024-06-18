const router = require('express').Router();


const countryInstance = require('../../controller/countryCode');


router.get('/:id?',countryInstance.countries)


module.exports = router;