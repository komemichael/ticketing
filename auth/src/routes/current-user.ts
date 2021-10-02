import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.status(200).json({hello: 'Hello2'});
});

export { router as current_user_router };