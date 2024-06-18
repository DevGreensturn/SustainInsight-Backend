const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const userRoles = require('../../controller/userroles');


router.get("/",  userRoles.getUsersRoles);
router.get("/:id",auth.authenticateToken,  userRoles.userRoleByid);
router.post("/",auth.authenticateToken,  userRoles.createUserRoles);
router.put("/:id",auth.authenticateToken,  userRoles.updateUserRoles);

module.exports = router;