const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./routes/apiRoutes'); 

const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mount the API routes from apiRoutes.js
app.use('/api', apiRoutes);

// HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));