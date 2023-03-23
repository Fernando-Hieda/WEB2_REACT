import express from 'express';
import { createUser, updateUser, retrieveUserByEmail } from '../persistence/userPersistence.js';

const router = express.Router();

// Save or update a user.
// If an id is provided, user is updated (id and e-mail will not be updated).
// If no id is provided, user is created (new id will be generated).
router.put('/', async (req, res) => {
    try {
        if (req.body.id) {
            const updatedUser = await updateUser(req.body);
            return res.json(updatedUser);

        } else {
            const newUser = await createUser(req.body);
            return res.json(newUser);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating/updating user');
    }
});

// Retrieve a user by e-mail (provided via query param)
router.get('/', async (req, res) => {
    try {
        const user = await retrieveUserByEmail(req.query.email);
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