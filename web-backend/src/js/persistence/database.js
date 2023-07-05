import mysql from 'mysql2';

const pool = mysql.createPool({
    host: "172.20.0.2",
    user: "web2",
    port: "3306",
    password: "1234",
    database: "plshare"
}).promise();

export function getPool() { return pool; }
export async function closePool() {
    try {
        await pool.end();
    } catch (err) {
        console.log('Error closing pool');
        console.log(err);
    }
}