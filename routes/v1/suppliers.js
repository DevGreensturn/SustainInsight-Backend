const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const supplier = require('../../controller/supplierController');


router.post('/',supplier.createSupplier)
router.put('/:id',auth.authenticateToken,supplier.updateSupplier);
router.get('/:id?',supplier.getSupplier) 

module.exports = router;