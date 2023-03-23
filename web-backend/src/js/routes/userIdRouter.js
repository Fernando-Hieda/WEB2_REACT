import express from 'express';
import { retrieveUserById } from '../persistence/userPersistence.js';

const router = express.Router();

// Retrieve a user by e-mail (provided via query param)
router.get('/', async (req, res) => {
    try {
        const user = await retrieveUserById(req.query.id);
        if (user) {
            return res.json(user);
        } else {
            res.status(404).send('User does not exist');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving user');
    }
})

export default router;