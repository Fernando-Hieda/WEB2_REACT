import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_PLAYLIST =
    `INSERT INTO playlist(id,name,user_id)
                 VALUES (UUID_TO_BIN(?),?,UUID_TO_BIN(?))`;

const UPDATE_PLAYLIST =
    `UPDATE playlist set link=?, name=?
            WHERE BIN_TO_UUID(id)=?`;

const REMOVE_PLAYLIST =
`DELETE FROM playlist
        WHERE playlist.id=?`;

const SELECT_PLAYLIST_BY_ID =
`SELECT BIN_TO_UUID(id) as id
        FROM playlist
        WHERE id=UUID_TO_BIN(?)`;

const SELECT_PLAYLIST_BY_USER_ID =
    `SELECT BIN_TO_UUID(id) as id, playlist.name
            FROM playlist
            WHERE user_id=UUID_TO_BIN(?)`;

const SELECT_PLAYLIST_AND_USERS =
    `SELECT BIN_TO_UUID(playlist.id) as user_id, user.name as user_name, playlist.name
                FROM playlist
                INNER JOIN user
                ON playlist.user_id = user.id
                ORDER BY user_name ASC;`

export async function createPlaylist(playlist) {
    try {
        await getPool().execute(INSERT_PLAYLIST,
            [
                uuidv4(),
                playlist.name,
                playlist.user_id,
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating playlist for user: ' + playlist.user_id,
            err);
    }
}

export async function removePlaylist(playlist) {
    try {
        await getPool().execute(REMOVE_PLAYLIST,
            [
                playlist.id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error removing playlist: ' + playlist.id,
            err);
    }
}

export async function updatePlaylist(playlist) {
    try {
        await getPool().execute(UPDATE_PLAYLIST,
            [
                playlist.id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating playlist: ' + playlist.id,
            err);
    }
}

export async function retrievePlaylistsByUserId(user_id) {
    try {
        const [rows] = await getPool().execute(SELECT_PLAYLIST_BY_USER_ID, [user_id]);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving playlist by user id: ' + user_id,
            err);
    }
}

export async function retrievePlaylistsAndUsers(playlist) {
    try {
        const [rows] = await getPool().execute(SELECT_PLAYLIST_AND_USERS);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating playlist: ' + playlist.id,
            err);
    }
}