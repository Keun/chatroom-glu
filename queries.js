// CREATE TABLE chats (
//     user_id SERIAL PRIMARY KEY,
//     user_name VARCHAR(255),
//     room VARCHAR(255),
//     chat_text TEXT,
//     date_time TIMESTAMP
// );

// SELECT * FROM chats;
const pg = require('pg');
const process_db = require('dotenv').config();
const db_url = process.env.DATABASE_URL || process_db.parsed.DB_URL;
const client = new pg.Client({
    connectionString: db_url,
    ssl: { rejectUnauthorized: false }
});
client.connect();

    
const getChats = (roomName) => {
    
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM chats WHERE room = '"+roomName+"' ORDER BY date_time ASC;")
        .then(result => {
            resolve(result.rows);
        })
        .catch(e => console.error(e.stack))
    });
}

const insertChats = (request) => {
    const data = request;

    client.query('INSERT INTO chats (user_name, room, chat_text, date_time) VALUES ($1, $2, $3, NOW())', [data.user, data.room, data.msg], (error, results) => {
      if (error) {
        throw error
      }
      console.log(`Chat added to room: ${data.room}`);
    })
}

module.exports = {
    getChats,
    insertChats
}