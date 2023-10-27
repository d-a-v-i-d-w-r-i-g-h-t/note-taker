const notes = require('express').Router();

// require uuid package to create unique id for each note
const {v4: uuidv4 } = require('uuid');

// GET route for retrieving all saved notes
notes.get('/', (req, res) => {
  console.log(req);
  // read from file ('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for saving a new note
notes.post('/', (req, res) => {
  // destructure elements in req.body
  const { title, note } = req.body;

  // if body has a title and a note
  if (title && note) {
    const newNote = {
      title,
      note,
      note_id: uuidv4()
    };

    // read and append (newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote
    }

    res.json(response);
  } else {
    res.json('Error in saving new note');
  }

});

module.exports = notes;