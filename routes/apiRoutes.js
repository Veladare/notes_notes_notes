const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const router = express.Router();

let db = [];

router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let dbInfo = JSON.parse(data);
    return res.json(dbInfo);
  });
});

router.post('/notes', (req, res) => {
  const addNote = req.body;
  addNote.id = uuidv4();
  db.push(addNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  return res.json(db);
});

router.delete('/notes/:id', (req, res) => {
  const deleteNote = db.filter((note) => note.id != req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
  res.json(deleteNote);
});

module.exports = router;