import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller'

const router = express.Router();

router.route('/api/users', )
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(authCtrl.signinRequired, userCtrl.findUser)
    .put(authCtrl.signinRequired, authCtrl.isAuthorizate, 
        userCtrl.update)
    .post(userCtrl.update);
router.route('/api/edit/user/:userIdEdit')
        .post(authCtrl.signinRequired, userCtrl.update);
 
router.param('userIdEdit', userCtrl.update)
router.param('userId', userCtrl.findUser);

export default router;