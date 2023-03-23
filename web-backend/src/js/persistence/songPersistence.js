import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_SONG =
    `INSERT INTO song(id,link,name,reference)
                 VALUES (UUID_TO_BIN(?),?,?,UUID_TO_BIN(?))`;

const UPDATE_SONG =
    `UPDATE song set link=?, name=?
            WHERE BIN_TO_UUID(id)=?`;

const REMOVE_SONG =
`DELETE FROM song
        WHERE song.id=?`;

const SELECT_SONG_BY_PLAYLIST =
    `SELECT BIN_TO_UUID(id) as id, link, name
            FROM song
            WHERE reference=UUID_TO_BIN(?)`;

const SELECT_SONG_AND_PLAYLISTS =
    `SELECT BIN_TO_UUID(song.id) as reference, playlist.link as plink, song.link, song.name
                FROM song
                INNER JOIN playlist
                ON song.reference = playlist.id
                ORDER BY plink ASC;`

export async function createSong(song) {
    try {
        await getPool().execute(INSERT_SONG,
            [
                uuidv4(),
                song.link,
                song.name,
                song.reference,
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating song in playlist: ' + song.reference,
            err);
    }
}

export async function removeSong(song) {
    try {
        await getPool().execute(REMOVE_SONG,
            [
                song.id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error removing song: ' + song.id,
            err);
    }
}

export async function updateSong(song) {
    try {
        await getPool().execute(UPDATE_SONG,
            [
                song.link,
                song.name,
                song.id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating song: ' + song.id,
            err);
    }
}

export async function retrieveSongByPlaylistId(reference) {
    try {
        const [rows] = await getPool().execute(SELECT_SONG_BY_PLAYLIST, [reference]);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving song in playlist: ' + reference,
            err);
    }
}

export async function retrieveSongsAndPlaylists() {
    try {
        const [rows] = await getPool().execute(SELECT_SONG_AND_PLAYLISTS);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating song: ' + song.id,
            err);
    }
}