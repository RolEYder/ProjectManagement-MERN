import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller'

const router = express.Router();

router.route('/api/users', )
    //.get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(authCtrl.signinRequired)
    .put(authCtrl.signinRequired, authCtrl.isAuthorizate, 
        userCtrl.update)
    .post(userCtrl.update);

export default router;