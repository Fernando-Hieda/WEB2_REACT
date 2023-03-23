import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_USER =
    `INSERT INTO user(id,email,password)
                 VALUES (UUID_TO_BIN(?),?,?)`;

const UPDATE_USER =
    `UPDATE user set email=?,password=?
            WHERE BIN_TO_UUID(id)=?`;

const SELECT_USER_BY_ID =
    `SELECT BIN_TO_UUID(id) as id,email,password
            FROM user
            WHERE id=UUID_TO_BIN(?)`;

const SELECT_USER_BY_EMAIL =
    `SELECT BIN_TO_UUID(id) as id,email,password
            FROM user
            WHERE email=?`;

export async function retrieveUserById(id) {
    try {
        const [rows] = await getPool().execute(SELECT_USER_BY_ID, [id]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving user by id: ' + id,
            err);
    }
}

export async function retrieveUserByEmail(email) {
    try {
        const [rows] = await getPool().execute(SELECT_USER_BY_EMAIL, [email]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving user by email: ' + email,
            err);
    }
}

export async function createUser(user) {
    if (await retrieveUserByEmail(user.email)) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'User email already exists: ' + user.email,
            null);
    }
    try {
        user.id = uuidv4();
        await getPool().execute(INSERT_USER,
            [
                user.id,
                user.email,
                user.password,
            ]);
        return user;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating user: ' + user.email,
            err);
    }
}

export async function updateUser(user) {
    try {
        await getPool().execute(UPDATE_USER,
            [
                user.email,
                user.password,
                user.id,
            ]);
        return user;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating user: ' + user.id,
            err);
    }
}