import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { User } from '../../models/users'

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim()
        .isLength({min: 4, max: 20})
        .withMessage('Invalid password (4 and 20 characters)'),
], async (req: Request, res: Response) => {
    await console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new RequestValidationError(errors.array());
    const { email, password } = req.body;

    const existing_user = await User.findOne({ email });
    if (existing_user) throw new BadRequestError('Email in use');

    const user = User.build({email, password});
    await user.save();

    const user_jwt = jwt.sign({
        email: user.email, 
        id: user.id
    }, process.env.JWT_KEY || 'komo@zoneX1');

    req.session = {jwt: user_jwt};

    res.status(201).json({success: user}); 
});

export { router as signup_router };