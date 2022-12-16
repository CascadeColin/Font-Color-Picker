'use strict';

const express = require('express');
const path = require('path');
const app = express();

// sets PORT for Heroku, or 3001 if developing on localhost
const PORT = process.env.PORT || 3001;
// const data = require('./db/db.json');
const fs = require('fs');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/data', (req, res) => {
    const newDataArray = req.body;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) console.error(err);
        fs.writeFile('./db/db.json', JSON.stringify(newDataArray, null, 3), (err) => {
            err ? console.error(err) : console.info('Data added to db.json!');        
        });
    });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/404.html')));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));