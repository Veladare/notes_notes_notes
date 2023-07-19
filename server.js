const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3001;

const { v4: uuidv4 } = require('uuid');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


let db = [];

//API routes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let dbInfo = JSON.parse(data);
    return res.json(dbInfo);
  });
});

app.post('/api/notes', (req, res) => {
  const addNote = req.body
  addNote.id = uuidv4();
  db.push(addNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  return res.json(db)
});

app.delete('/api/notes/:id', (req, res) => {
    const deleteNote = db.filter((note) => note.id != req.params.id);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
  
    res.json(deleteNote);
  });



//HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));