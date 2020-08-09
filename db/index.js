const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('./db/database.json');
const db = low(adapter);

module.exports = db;
