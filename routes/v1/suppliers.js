const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const supplier = require('../../controller/supplierController');


router.post('/',auth.authenticateToken,supplier.createSupplier)
router.put('/:id',auth.authenticateToken,supplier.updateSupplier);
router.get('/:id?',supplier.getSupplier); 
router.patch('/:id',auth.authenticateToken,supplier.deleteSupplier);

module.exports = router;