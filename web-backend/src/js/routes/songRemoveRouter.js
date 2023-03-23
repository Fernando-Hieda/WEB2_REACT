import express from 'express';
import { createSong, updateSong, retrieveSongsAndPlaylists, retrieveSongByPlaylistId } from '../persistence/songPersistence.js';

const router = express.Router();

// Save or update a song.
// If an id is provided, song is updated (id and reference will not be updated).
// If no id is provided, song is created (new id will be generated).
router.put('/', async (req, res) => {
    try {
        if (req.body.id) {
            const updatedSong = await removeSong(req.body);
            return res.json(updatedSong);
        }
    } catch (err) {
        if (err.cause?.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(400).send('Song ' + req.body.id + ' does not exist');
        } else {
            console.log(err);
            res.status(500).send('Error removing song');
        }
    }
});

// Retrieve a song by playlist (provided via query param)
router.get('/', async (req, res) => {
    try {
        if (req.query.reference) {
            const songs = await retrieveSongByPlaylistId(req.query.reference);
            return res.json(songs);
        } else {
            const allSongs = await retrieveSongsAndPlaylists();
            return res.json(allSongs);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving songs');
    }
});


export default router;