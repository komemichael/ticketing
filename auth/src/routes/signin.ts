import express from 'express';
const router = express.Router();

router.get('/api/users/signin', (req, res) => {
    res.status(200).json({hello: 'Hello'});
});

export { router as signin_router };