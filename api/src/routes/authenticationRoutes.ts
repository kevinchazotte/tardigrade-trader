// api/src/routes/authenticationRoutes.ts
import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authenticationController';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
