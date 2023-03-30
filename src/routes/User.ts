import express from 'express';
import controller from '../controllers/User';

const router = express.Router()

router.post('/register', controller.createUser)
router.post('/validate-username', controller.validateUsername)

export = router