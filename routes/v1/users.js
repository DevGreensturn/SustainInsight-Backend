const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const user = require('../../controller/userController');
const userRoles = require('../../controller/userroles');

router.post('/',user.createUser);
router.post('/login',user.userLogin); 
router.put('/:id',auth.authenticateToken,user.updateUser);
router.post('/social/login',user.googleLogin);
router.get('/',user.testAPI); 

router.get("/roles",auth.authenticateToken,  userRoles.getUsersRoles);
router.get("/roles/:id",auth.authenticateToken,  userRoles.userRoleByid);
router.post("/roles",auth.authenticateToken,  userRoles.createUserRoles);
router.put("/roles/:id",auth.authenticateToken,  userRoles.updateUserRoles);

module.exports = router;